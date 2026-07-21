import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  ArrowLeftIcon,
  Sparkles,
  FolderIcon,
  ChevronLeft,
  ChevronRight,
  Share2Icon,
  EyeIcon,
  EyeOff,
  DownloadIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom"; // ✅ BUG 1 FIX: useLocation imported from react-router-dom (not a separate import)
import PersonalInfoForm from "../Components/PersonalInfoForm";
import ResumePreview from "../Components/ResumePreview";
import TemplateSelector from "../Components/TemplateSelector";
import ColorPicker from "../Components/ColorPicker";
import ProfessionalSummyForm from "../Components/ProfessionalSummaryForm";
import ExperienceForm from "../Components/ExperienceForm";
import EducationForm from "../Components/EducationForm";
import ProjectForm from "../Components/ProjectForm";
import SkillsForm from "../Components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation(); // ✅ moved here — one declaration, used everywhere

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "modern",
    accent_color: "#3B82F6",
    public: false,
  });

  // ── Load from DB ────────────────────────────────────────────────────────────
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // ✅ BUG 2 FIX: Two conflicting useEffects both calling loadExistingResume.
  // Collapsed into one effect that handles both cases cleanly.
  useEffect(() => {
    if (!resumeId) return;

    const parsedData = location.state?.parsedData;

    if (parsedData) {
      // Uploaded resume: load DB record first, then overlay AI-parsed fields
      loadExistingResume().then(() => {
        setResumeData((prev) => ({
          ...prev,
          // ✅ BUG 3 FIX: map parsedData keys → resumeData keys correctly
          personal_info: {
            ...prev.personal_info,
            full_name: parsedData.name     || prev.personal_info.full_name,
            email:     parsedData.email    || prev.personal_info.email,
            phone:     parsedData.phone    || prev.personal_info.phone,
            location:  parsedData.location || prev.personal_info.location,
            linkedin:  parsedData.linkedin || prev.personal_info.linkedin,
            website:   parsedData.website  || prev.personal_info.website,
          },
          professional_summary: parsedData.summary    || prev.professional_summary,
          // ✅ BUG 4 FIX: experience/education objects from AI have different key names
          // than what your forms expect — map them here so fields actually populate
          experience: (parsedData.experience || []).map((exp) => ({
            company:     exp.company     || "",
            role:        exp.role        || "",
            startDate:   exp.startDate   || "",
            endDate:     exp.endDate     || "",
            description: exp.description || "",
          })),
          education: (parsedData.education || []).map((edu) => ({
            institution: edu.institution || "",
            degree:      edu.degree      || "",
            field:       edu.field       || "",
            startDate:   edu.startDate   || "",
            endDate:     edu.endDate     || "",
          })),
          // ✅ BUG 5 FIX: skills from AI is string[] but SkillsForm may expect [{name}] — 
          // normalise to whatever your SkillsForm expects (adjust if needed)
         // ✅ Keep skills as plain strings always
skills: (parsedData.skills || []).map((s) =>
  typeof s === "object" && s !== null ? (s.name ?? s.label ?? "") : String(s)
),
        }));
      });
    } else {
      // Normal open: just load from DB
      loadExistingResume();
    }
  }, [resumeId]); // ✅ single effect, no duplicate calls

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal",    name: "Personal Info", icon: User },
    { id: "summary",     name: "Summary",       icon: FileText },
    { id: "experience",  name: "Experience",    icon: Briefcase },
    { id: "education",   name: "Education",     icon: GraduationCap },
    { id: "projects",    name: "Projects",      icon: FolderIcon },
    { id: "skills",      name: "Skills",        icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  // ── Visibility toggle ───────────────────────────────────────────────────────
const changeResumeVisibility = async () => {
  try {
    const { data } = await api.put(
      "/api/resumes/update",
      {
        resumeId,
        resumeData: { ...resumeData, public: !resumeData.public }, // send everything
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResumeData(data.resume);
    toast.success(data.message);
  } catch (error) {
    console.error("Error toggling visibility:", error);
  }
};
  // ── Share ───────────────────────────────────────────────────────────────────
  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser");
    }
  };

  // ── Download ────────────────────────────────────────────────────────────────
  const downloadResume = () => {
    window.print();
  };

  // ── Save ────────────────────────────────────────────────────────────────────
 const saveResume = async () => {
  try {
    const cleanedData = {
      ...resumeData,
      skills: (resumeData.skills || []).map((s) =>
        typeof s === "string" ? s : s.name
      ),
    };

    const { data } = await api.put(
      "/api/resumes/update",
      {
        resumeId,
        resumeData: cleanedData,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResumeData({
      ...data.resume,
      skills: data.resume.skills || [],
    });

    return data.message;
  } catch (error) {
    console.log("BACKEND ERROR:", error?.response?.data);
    throw error;
  }
};
  return (
   <div>
  {/* Top nav */}
  <div className="max-w-7xl mx-auto px-4 py-6">
    <Link
      to="/app"
      className="inline-flex gap-2 items-center text-[#0F172A]/50 hover:text-[#0F172A] transition-all"
    >
      <ArrowLeftIcon className="size-4" />
      Back to Dashboard
    </Link>
  </div>

  <div className="max-w-7xl mx-auto px-4 pb-8">
    <div className="grid lg:grid-cols-12 gap-8">

      {/* LEFT — Form panel */}
      <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
        <div className="bg-[#F8FAFC] rounded-lg shadow-sm border border-[#E2E8F0] p-6 pt-1">

          {/* Progress bar */}
          <hr className="absolute top-0 left-0 right-0 border-2 border-[#E2E8F0]" />
          <hr
            className="absolute top-0 left-0 h-1 border-none transition-all duration-500"
            style={{
              width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
              background: '#2563EB',
            }}
          />

          {/* Section nav */}
          <div className="flex justify-between items-center mb-6 border-b border-[#E2E8F0] py-1">
            <div className="flex items-center gap-2">
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) =>
                  setResumeData((prev) => ({ ...prev, template }))
                }
              />
              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData((prev) => ({ ...prev, accent_color: color }))
                }
              />
            </div>

            <div className="flex items-center">
              {activeSectionIndex !== 0 && (
                <button
                  onClick={() =>
                    setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                  }
                  className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-[#0F172A]/60 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>
              )}
              <button
                onClick={() =>
                  setActiveSectionIndex((prev) =>
                    Math.min(prev + 1, sections.length - 1)
                  )
                }
                disabled={activeSectionIndex === sections.length - 1}
                className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-[#0F172A]/60 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-all ${
                  activeSectionIndex === sections.length - 1 && "opacity-50"
                }`}
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Active form */}
          <div className="space-y-6">
            {activeSection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(updatedData) =>
                  setResumeData((prev) => ({
                    ...prev,
                    personal_info: updatedData,
                  }))
                }
              />
            )}
            {activeSection.id === "summary" && (
              <ProfessionalSummyForm
                data={resumeData.professional_summary}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: data,
                  }))
                }
                setResumeData={setResumeData}
              />
            )}
            {activeSection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, experience: data }))
                }
              />
            )}
            {activeSection.id === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, education: data }))
                }
              />
            )}
            {activeSection.id === "projects" && (
              <ProjectForm
                data={resumeData.projects}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, projects: data }))
                }
              />
            )}
            {activeSection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, skills: data }))
                }
              />
            )}
          </div>

          <button
            onClick={() =>
              toast.promise(saveResume(), {
                loading: "Saving...",
                success: "Saved successfully",
                error: "Failed to save",
              })
            }
            className="bg-[#DBEAFE] ring-[#93C5FD] text-[#2563EB] ring hover:ring-[#2563EB] hover:bg-[#BFDBFE] transition-all rounded-md px-6 py-2 mt-6 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* RIGHT — Preview panel */}
      <div className="lg:col-span-7 max-lg:mt-6">
        <div className="relative w-full">
          <div className="absolute bottom-3 flex left-0 right-0 items-center justify-end gap-2">
            {resumeData.public && (
              <button
                onClick={handleShare}
                className="flex items-center p-2 px-4 gap-2 text-xs bg-[#DBEAFE] text-[#2563EB] rounded-lg ring-[#93C5FD] hover:ring transition-colors"
              >
                <Share2Icon className="size-4" />
                Share
              </button>
            )}
            <button
              onClick={changeResumeVisibility}
              className="flex items-center p-2 px-2 gap-2 text-xs bg-[#EFF6FF] text-[#2563EB] ring-[#BFDBFE] rounded-lg hover:ring transition-colors"
            >
              {resumeData.public ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
              {resumeData.public ? "Public" : "Private"}
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center px-6 gap-2 py-2 text-xs bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              <DownloadIcon className="size-4" />
              Download
            </button>
          </div>
        </div>

        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>

    </div>
  </div>
</div>
  );
};

export default ResumeBuilder;
