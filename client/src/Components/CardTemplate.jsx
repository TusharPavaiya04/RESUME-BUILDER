import React from "react";

const CardTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  return (
    <div className="bg-gray-100 min-h-[1122px] p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          {p.image && (
            <img
              src={
                typeof p.image === "string"
                  ? p.image
                  : URL.createObjectURL(p.image)
              }
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          <div>
            <h1 className="text-2xl font-bold">{p.full_name}</h1>
            <p className="text-gray-600">{p.profession}</p>
            <p className="text-sm text-gray-500">
              {p.email} | {p.phone && `|${p.phone}`} {p.location&&`|${p.location}`} 
            </p>
              <div className="mt-2 text-sm text-blue-600 flex gap-4 flex-wrap">
      {p.linkedin && (
        <a href={p.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
          LinkedIn
        </a>
      )}

      {p.website && (
        <a href={p.website} target="_blank" rel="noreferrer" className="hover:underline">
          Portfolio
        </a>
      )}
    </div>

          </div>
        </div>

        {/* Summary */}
        <div className="mt-4">
          <h2
            className="font-semibold text-lg mb-1"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-sm text-gray-700">
            {data.professional_summary}
          </p>
        </div>

        {/* Experience */}
        <div className="mt-4">
          <h2
            className="font-semibold text-lg mb-1"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          {data.experience?.map((exp, i) => (
            <div
              key={i}
              className="mt-2 p-3 border rounded-lg bg-gray-50"
            >
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

        {/* Projects */}
        <div className="mt-4">
          <h2
            className="font-semibold text-lg mb-1"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {data.projects?.map((proj, i) => (
            <div
              key={i}
              className="mt-2 p-3 border rounded-lg bg-gray-50"
            >
              <p className="font-semibold">{proj.name}</p>
              <p className="text-sm text-gray-600">{proj.type}</p>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-4">
          <h2
            className="font-semibold text-lg mb-1"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {data.education?.map((edu, i) => (
            <div
              key={i}
              className="mt-2 p-3 border rounded-lg bg-gray-50"
            >
              <p className="font-semibold">{edu.institution}</p>
              <p>{edu.degree} - {edu.field}</p>
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

        {/* Skills */}
        <div className="mt-4">
          <h2
            className="font-semibold text-lg mb-1"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardTemplate;