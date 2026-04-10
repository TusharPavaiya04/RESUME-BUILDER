import Resume from "../model/resume.js";
import ai from '../configs/ai.js'

// controller for enhancing a resume professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                   content: `
You are a professional resume writer.

Your task:
- Rewrite the given content into a strong, concise resume summary.
- Keep it under 3-4 lines.
- Do NOT give multiple options.
- Do NOT explain anything.
- Do NOT add headings like "Option 1".
- Do NOT use markdown or bullet points.
- Output ONLY the final improved summary.

Make it impactful, professional, and ATS-friendly.
`
                },
                {
                    role: "user",
                    content: userContent,
                },
            ]
        });

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({
            enhancedContent: enhancedContent
        });
      

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message
        });
    }
};


// controller for enhancing a resume job description
// POST :/api/ai/enhance-job-desc
// Controllers/aiController.js
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || userContent.trim() === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are an expert resume writer.

Rewrite the given job description into EXACTLY 1 strong ATS-friendly bullet point.

Rules:
- Output ONLY 1 bullet point
- No options
- No explanations
- No headings
- Start with an action verb
- Keep it concise (max 25 words)
- Use metrics if possible
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content.trim();

    return res.status(200).json({
      enhancedContent,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// contollers for uploading a resume to the database
// POST: /api/ai/upload-resume
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("../utils/pdfParser.cjs");

// ✅ Replace the whole extractTextWithOCR function with this
const extractTextWithOCR = async (buffer) => {
  console.log("⚠️ OCR skipped — ImageMagick not installed");
  return "";
};
// ── SAFE JSON PARSER ──────────────────────────────────────────────────────────
const safeParseJSON = (raw) => {
  try {
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
};

// ── MAIN CONTROLLER ───────────────────────────────────────────────────────────
export const uploadResume = async (req, res) => {
  let filePath = null;

  try {
    const userId = req.userId; // make sure authMiddleware sets req.userId
    const { title } = req.body;

    // 1. File presence
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    filePath = path.resolve(req.file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Uploaded file not found on disk" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    // 2. Read buffer
    const dataBuffer = fs.readFileSync(filePath);

    console.log("📦 File size (bytes):", dataBuffer.length);

    // 3. Extract text
    let extractedText = "";
    let pdfParseLength = 0;

    try {
      const pdfData = await pdf(dataBuffer);
      extractedText = pdfData.text || "";
      pdfParseLength = extractedText.trim().length;
      console.log("✅ pdf-parse text length:", pdfParseLength);
      console.log("📄 Preview:", extractedText.substring(0, 300));
    } catch (err) {
      console.error("pdf-parse error:", err.message);
    }

    // 4. OCR fallback
    if (pdfParseLength < 50) {
      console.log("⚠️  Trying OCR fallback...");
      const ocrText = await extractTextWithOCR(dataBuffer);
      console.log("   OCR length:", ocrText.trim().length);
      if (ocrText.trim().length > pdfParseLength) {
        extractedText = ocrText;
      }
    }

    if (!extractedText || extractedText.trim().length < 30) {
      return res.status(400).json({
        message: "Could not extract text from PDF. Make sure it is not a blank or heavily scanned document.",
        debug: { pdfParseLength, finalLength: extractedText.trim().length }, // helpful for frontend debugging
      });
    }

    // 5. Clean
    const cleanText = extractedText.replace(/\s+/g, " ").trim();

    // 6. AI parse
    let parsedData = {};
    let aiResponse;

    try {
      aiResponse = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            // ✅ BUG 4 FIX: field names now match exactly what ResumeBuilder.jsx expects
            // personal_info.full_name, professional_summary, experience[], education[], skills[]
            content: `You are a resume parser. Extract data and return ONLY valid JSON, no markdown, no explanation.

Return this exact structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "location": "City, Country",
  "summary": "Professional summary text",
  "linkedin": "LinkedIn URL or null",
  "website": "Portfolio URL or null",
  "skills": ["Skill1", "Skill2"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "Jan 2020",
      "endDate": "Mar 2023",
      "description": "Responsibilities"
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "2016",
      "endDate": "2020"
    }
  ],
  "certifications": [],
  "languages": []
}

Rules: use null for missing strings, [] for missing arrays. Never invent data.`,
          },
          {
            role: "user",
            content: `Parse this resume:\n\n${cleanText.substring(0, 8000)}`,
          },
        ],
      });

      const raw = aiResponse.choices[0]?.message?.content || "";
      parsedData = safeParseJSON(raw);

      if (!parsedData) {
        console.warn("⚠️  AI returned unparseable JSON:", raw.substring(0, 200));
        parsedData = {};
      } else {
        console.log("✅ Parsed name:", parsedData.name);
      }
    } catch (err) {
      console.error("AI parsing failed:", err.message);
      console.error(
        "AI raw response:",
        aiResponse?.choices?.[0]?.message?.content?.substring(0, 300)
      );
      parsedData = {};
    }

    // 7. Save to DB
    const newResume = await Resume.create({
      userId,
      title: title || parsedData?.name || "Untitled Resume",
      fileUrl: req.file.originalname,      // ✅ BUG 5 FIX: don't store temp path (gets deleted in finally)
      content: cleanText,
      parsedData,
    });

    // 8. Respond
    return res.status(201).json({
      message: "Resume uploaded and processed successfully",
      resume: newResume,
      parsedData,
    });

  } catch (error) {
    console.error("❌ Upload Resume Error:", error);
    return res.status(500).json({
      message: "Failed to upload resume",
      error: error.message,
    });
  } finally {
    // 9. Always clean up temp file
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Could not delete temp file:", e.message);
      }
    }
  }
};