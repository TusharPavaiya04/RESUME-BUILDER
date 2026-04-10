import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {

  const addProject = () => {
    const newProject = {
      institution: "",
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const inputClass = 'w-full px-3 py-2 text-sm rounded-lg border bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder:text-[#0F172A]/30 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-[#0F172A]'>
            Projects
          </h3>
          <p className='text-sm text-[#0F172A]/50'>Add your project details</p>
        </div>

        <button
          onClick={addProject}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-[#DBEAFE] text-[#2563EB] rounded-lg hover:bg-[#BFDBFE] transition-colors'
        >
          <Plus className='size-4' />
          Add Project
        </button>
      </div>

      <div className='space-y-4 mt-6'>
        {data?.map((project, index) => (
          <div key={index} className='p-4 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg space-y-3'>
            <div className='flex justify-between items-start'>
              <h4 className='text-sm font-medium text-[#0F172A]'>
                Project #{index + 1}
              </h4>
              <button
                onClick={() => removeProject(index)}
                className='text-red-400 hover:text-red-600 transition-colors'
              >
                <Trash2 className='size-4' />
              </button>
            </div>

            <div className='grid gap-3'>
              <input
                value={project.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                type="text"
                placeholder='Project Name'
                className={inputClass}
              />

              <input
                value={project.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                type="text"
                placeholder='Project Type'
                className={inputClass}
              />

              <textarea
                rows={4}
                value={project.description || ""}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                placeholder='Describe your project...'
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;