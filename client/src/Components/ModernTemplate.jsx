import React from "react";

const ModernTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  // ✅ Handle image properly
  const imageSrc = p.image
    ? typeof p.image === "string"
      ? p.image
      : URL.createObjectURL(p.image)
    : null;

  return (
    <div className="flex min-h-[1122px] font-sans">
      
      {/* Sidebar */}
      <div
        className="w-1/3 p-6 text-white flex flex-col items-center"
        style={{ backgroundColor: accentColor || "#2563eb" }}
      >
        {/* ✅ Profile Image */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold mb-4">
            {p.full_name?.charAt(0) || "?"}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center">{p.full_name}</h1>
        <p className="mb-4 text-center">{p.profession}</p>

        {/* Contact */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mt-6">Contact</h2>
          <p>{p.email}</p>
          <p>{p.phone}</p>
          <p>{p.location}</p>
        </div>

        {/* Links */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mt-6">Links</h2>
          <p>{p.linkedin}</p>
          <p>{p.website}</p>
        </div>

        {/* Skills */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mt-6">Skills</h2>

          {data.skills?.length > 0 ? (
            <ul className="list-disc ml-4">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-80">No skills added</p>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="w-2/3 p-6 bg-white">
        
        {/* Summary */}
        <h2
          className="text-xl font-semibold border-b pb-1"
          style={{ color: accentColor }}
        >
          Summary
        </h2>
        <p className="mt-2">{data.professional_summary}</p>

        {/* Experience */}
        <h2
          className="text-xl font-semibold mt-6 border-b pb-1"
          style={{ color: accentColor }}
        >
          Experience
        </h2>

        {data.experience?.map((exp, i) => (
          <div key={i} className="mt-3">
            <h3 className="font-bold">{exp.company}</h3>
            <p>{exp.position}</p>
            <p className="text-sm text-gray-600">{exp.description}</p>
          </div>
        ))}

        {/* Projects */}
        <h2
          className="text-xl font-semibold mt-6 border-b pb-1"
          style={{ color: accentColor }}
        >
          Projects
        </h2>

        {data.projects?.map((project, i) => (
          <div key={i} className="mt-3">
            <h3 className="font-bold">{project.name}</h3>
            <p>{project.type}</p>
            <p className="text-sm text-gray-600">
              {project.description}
            </p>
          </div>
        ))}

        {/* Education */}
        <h2
          className="text-xl font-semibold mt-6 border-b pb-1"
          style={{ color: accentColor }}
        >
          Education
        </h2>

        {data.education?.map((edu, i) => (
          <div key={i} className="mt-3">
            <p className="font-bold">{edu.institution}</p>
            <p>{edu.degree} - {edu.field}</p>

            <p className="text-sm">
              {edu.graduation_date
                ? new Date(edu.graduation_date + "-01").toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })
                : ""}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;