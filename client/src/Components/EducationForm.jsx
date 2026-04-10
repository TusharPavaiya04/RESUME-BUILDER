import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data = [], onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_data: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const inputClass = 'px-3 py-2 text-sm rounded-lg border bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder:text-[#0F172A]/30 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors w-full';

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-[#0F172A]'>
            Education
          </h3>
          <p className='text-sm text-[#0F172A]/50'>Add your education details</p>
        </div>

        <button
          onClick={addEducation}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-[#DBEAFE] text-[#2563EB] rounded-lg hover:bg-[#BFDBFE] transition-colors'
        >
          <Plus className='size-4' />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-[#0F172A]/40'>
          <GraduationCap className='w-12 h-12 mx-auto mb-3 text-[#0F172A]/20' />
          <p>No Education added yet.</p>
          <p className='text-sm'>Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((education, index) => (
            <div key={index} className='p-4 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg space-y-3'>
              <div className='flex justify-between items-start'>
                <h4 className='text-sm font-medium text-[#0F172A]'>
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className='text-red-400 hover:text-red-600 transition-colors'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  value={education.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  type="text"
                  placeholder='Institution Name'
                  className={inputClass}
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  type="text"
                  placeholder='Degree'
                  className={inputClass}
                />

                <input
                  value={education.field || ""}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  type="text"
                  placeholder='Field of Study'
                  className={inputClass}
                />

                <input
                  value={education.graduation_data || ""}
                  onChange={(e) => updateEducation(index, "graduation_data", e.target.value)}
                  type="month"
                  className={inputClass}
                />
              </div>

              <input
                value={education.gpa || ""}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                type="text"
                placeholder='GPA (optional)'
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;