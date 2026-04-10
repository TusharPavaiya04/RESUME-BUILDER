import React from "react";

const ATSTemplate = ({ data }) => {
  const p = data.personal_info || {};

  return (
    <div className="p-8 text-black font-serif text-sm leading-relaxed max-w-3xl mx-auto">

      {/* Header */}
      <h1 className="text-xl font-bold">{p.full_name}</h1>
      <p>
        {p.email} | {p.phone} | {p.location}
      </p>
      <p>
        {p.linkedin} {p.website && `| ${p.website}`}
      </p>

      {/* Summary */}
      <h2 className="mt-4 font-bold uppercase">Summary</h2>
      <p>{data.professional_summary}</p>

      {/* Experience */}
      <h2 className="mt-4 font-bold uppercase">Experience</h2>
      {data.experience?.map((exp, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">
            {exp.position || exp.role} - {exp.company}
          </p>
          <p className="text-xs">
            {exp.start_date} - {exp.end_date || "Present"}
          </p>
          <p>{exp.description}</p>
        </div>
      ))}

      {/* Education */}
      <h2 className="mt-4 font-bold uppercase">Education</h2>
      {data.education?.map((edu, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">{edu.institution}</p>
          <p>{edu.degree} - {edu.field}</p>
          <p className="text-xs">
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

      {/* Projects */}
      <h2 className="mt-4 font-bold uppercase">Projects</h2>
      {data.projects?.map((proj, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">{proj.name}</p>
          <p>{proj.description}</p>
        </div>
      ))}

      {/* Skills */}
      <h2 className="mt-4 font-bold uppercase">Skills</h2>
      <p>{data.skills?.join(", ")}</p>
    </div>
  );
};

export default ATSTemplate;