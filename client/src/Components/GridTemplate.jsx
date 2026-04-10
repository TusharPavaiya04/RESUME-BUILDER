import React from "react";

const GridTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  return (
    <div className="bg-gray-100 min-h-[1122px] p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">{p.full_name}</h1>
            <p className="text-gray-600">{p.profession}</p>
            <p className="text-sm text-gray-500">
              {p.email} | {p.phone} | {p.location}
            </p>
          </div>

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
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* LEFT SIDE */}
          <div className="col-span-1 space-y-6">

            {/* Skills */}
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-200 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Links
              </h2>
              <p className="text-sm">{p.linkedin}</p>
              <p className="text-sm">{p.website}</p>
            </div>

            {/* Education */}
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Education
              </h2>

              {data.education?.map((edu, i) => (
                <div key={i} className="mb-2">
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
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-2 space-y-6">

            {/* Summary */}
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Summary
              </h2>
              <p className="text-sm text-gray-700">
                {data.professional_summary}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Experience
              </h2>

              {data.experience?.map((exp, i) => (
                <div key={i} className="mb-3">
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
            <div>
              <h2
                className="font-semibold text-lg mb-2"
                style={{ color: accentColor }}
              >
                Projects
              </h2>

              {data.projects?.map((proj, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{proj.name}</p>
                  <p className="text-sm text-gray-500">{proj.type}</p>
                  <p className="text-sm">{proj.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTemplate;