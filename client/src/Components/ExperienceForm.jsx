import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import api from '../configs/api.js';

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const exp = data[index];

    if (!exp.description) {
      return toast.error("Write description first");
    }

    setGeneratingIndex(index);

    try {
      const res = await api.post(
        "/api/ai/enhance-job-desc",
        {
          userContent: `Enhance this: ${exp.description} for ${exp.position} at ${exp.company}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      updateExperience(index, "description", res.data.enhancedContent);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
            <Briefcase className="size-5" />
            Experience
          </h3>
          <p className="text-sm text-[#0F172A]/50">
            Add your work experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-[#DBEAFE] text-[#2563EB] rounded hover:bg-[#BFDBFE] transition"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {/* EMPTY */}
      {data.length === 0 && (
        <p className="text-sm text-[#0F172A]/40 text-center">
          No experience added yet
        </p>
      )}

      {/* LIST */}
      <div className="space-y-5">
        {data.map((exp, index) => (
          <div key={index} className="space-y-3 border-b border-[#E2E8F0] pb-5">

            {/* TOP ROW */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-[#0F172A]">
                Experience #{index + 1}
              </p>

              <button
                onClick={() => removeExperience(index)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* INPUTS */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                value={exp.company}
                onChange={(e) => updateExperience(index, "company", e.target.value)}
                placeholder="Company"
                className="input p-1 bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder:text-[#0F172A]/30 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />

              <input
                value={exp.position}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
                placeholder="Role"
                className="input p-1 bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder:text-[#0F172A]/30 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />

              <input
                type="month"
                value={exp.start_date}
                onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                className="input p-1 bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:ring-[#2563EB] focus:border-[#2563EB]"
              />

              <input
                type="month"
                value={exp.end_date}
                onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                disabled={exp.is_current}
                className="input p-1 bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:ring-[#2563EB] focus:border-[#2563EB] disabled:opacity-40"
              />
            </div>

            {/* CHECKBOX */}
            <label className="flex items-center gap-2 text-sm text-[#0F172A]/60 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.is_current}
                onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                className="accent-[#2563EB]"
              />
              Currently working here
            </label>

            {/* DESCRIPTION */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#0F172A]/60">
                  Description
                </span>

                <button
                  onClick={() => generateDescription(index)}
                  disabled={
                    generatingIndex === index ||
                    !exp.description ||
                    !exp.company ||
                    !exp.position
                  }
                  className="flex items-center gap-2 px-2 py-1 text-xs bg-[#DBEAFE] text-[#2563EB] rounded hover:bg-[#BFDBFE] disabled:opacity-50 transition-colors"
                >
                  {generatingIndex === index ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Sparkles className="size-3" />
                  )}
                  {generatingIndex === index ? "Enhancing..." : "AI Enhance"}
                </button>
              </div>

              <textarea
                rows={4}
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
                placeholder="Describe your work..."
                className="w-full p-3 border text-sm bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder:text-[#0F172A]/30 rounded-lg focus:ring-[#2563EB] focus:border-[#2563EB] transition resize-none"
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;