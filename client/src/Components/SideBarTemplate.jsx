import React from "react";

const 
SidebarTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  return (
    <div className="flex min-h-[1122px] font-sans">

      {/* LEFT SIDEBAR */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: accentColor || "#2563eb" }}
      >
        {/* Profile */}
        {p.image && (
          <img
            src={
              typeof p.image === "string"
                ? p.image
                : URL.createObjectURL(p.image)
            }
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white"
          />
        )}

        <h1 className="text-xl font-bold text-center">{p.full_name}</h1>
        <p className="text-center text-sm mb-4">{p.profession}</p>

        {/* Contact */}
        <div className="mt-6">
          <h2 className="font-semibold border-b border-white/50 pb-1">
            Contact
          </h2>
          <p className="text-sm mt-2">{p.email}</p>
          <p className="text-sm">{p.phone}</p>
          <p className="text-sm">{p.location}</p>
        </div>

        {/* Links */}
        <div className="mt-6">
          <h2 className="font-semibold border-b border-white/50 pb-1">
            Links
          </h2>
          <p className="text-sm mt-2">{p.linkedin}</p>
          <p className="text-sm">{p.website}</p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-semibold border-b border-white/50 pb-1">
            Skills
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {data.skills?.map((skill, i) => (
              <li key={i}>• {skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-2/3 p-6 bg-white">

        {/* Summary */}
        {data.professional_summary && (
          <div>
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: accentColor }}
            >
              Summary
            </h2>
            <p className="text-sm mt-2">
              {data.professional_summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: accentColor }}
            >
              Experience
            </h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">
                  {exp.position || exp.role} - {exp.company}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.start_date} - {exp.end_date || "Present"}
                </p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            {data.projects.map((proj, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">{proj.name}</p>
                <p className="text-xs text-gray-500">{proj.type}</p>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: accentColor }}
            >
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">{edu.institution}</p>
                <p className="text-sm">
                  {edu.degree} - {edu.field}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.graduation_date
                    ? new Date(edu.graduation_date + "-01").toLocaleString(
                        "default",
                        { month: "short", year: "numeric" }
                      )
                    : ""}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SidebarTemplate;