import React from "react";

const MinimalTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  return (
    <div className="bg-white min-h-[1122px] p-8 font-sans text-gray-800 max-w-3xl mx-auto">

      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{p.full_name}</h1>
        <p className="text-gray-600">{p.profession}</p>

        <p className="text-sm mt-1">
          {p.email} | {p.phone} | {p.location}
        </p>

        <p className="text-sm">
          {p.linkedin} {p.website && `| ${p.website}`}
        </p>
      </div>

      {/* Summary */}
      {data.professional_summary && (
        <div className="mb-4">
          <h2
            className="font-semibold text-md mb-1"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-sm">{data.professional_summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-semibold text-md mb-1"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">
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
        <div className="mb-4">
          <h2
            className="font-semibold text-md mb-1"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {data.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{proj.name}</p>
              <p className="text-xs text-gray-500">{proj.type}</p>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-semibold text-md mb-1"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{edu.institution}</p>
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

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div>
          <h2
            className="font-semibold text-md mb-1"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <p className="text-sm">
            {data.skills.join(", ")}
          </p>
        </div>
      )}

    </div>
  );
};

export default MinimalTemplate;