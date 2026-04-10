import React from "react";

const ProfessionalTemplate = ({ data, accentColor }) => {
  const p = data.personal_info || {};

  return (
    <div className="p-10 bg-white text-black font-serif min-h-[1122px]">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">
        {p.full_name}
      </h1>

      <p className="text-center text-sm">
        {p.email} | {p.phone} | {p.location}
      </p>

      <p className="text-center text-sm">
        {p.linkedin} | {p.website}
      </p>

      <hr className="my-4" />

      {/* Summary */}
      <section>
        <h2 className="text-lg font-bold uppercase" style={{ color: accentColor }}>
          Summary
        </h2>
        <p>{data.professional_summary}</p>
      </section>

      {/* Experience */}
      <section className="mt-4">
        <h2 className="text-lg font-bold uppercase" style={{ color: accentColor }}>
          Experience
        </h2>

        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{exp.company}</p>
            <p>{exp.position}</p>
            <p className="text-sm text-gray-600">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mt-4">
        <h2 className="text-lg font-bold uppercase" style={{ color: accentColor }}>
          Projects
        </h2>

        {data.projects?.map((project, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{project.name}</p>
            <p>{project.type}</p>
            <p className="text-sm text-gray-700">
              {project.description}
            </p>
          </div>
        ))}
      </section>

      {/* Skills (ONLY ONE CLEAN SECTION) */}
      <section className="mt-4">
        <h2 className="text-lg font-bold uppercase" style={{ color: accentColor }}>
          Skills
        </h2>

        {data.skills?.length > 0 ? (
          <ul className="list-disc ml-6">
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No skills added</p>
        )}
      </section>

      {/* Education */}
      <section className="mt-4">
        <h2 className="text-lg font-bold uppercase" style={{ color: accentColor }}>
          Education
        </h2>

        {data.education?.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{edu.institution}</p>
            <p>{edu.degree} - {edu.field}</p>
            <p>
              {edu.graduation_date}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default ProfessionalTemplate;