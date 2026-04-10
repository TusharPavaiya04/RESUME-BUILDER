import { Loader2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProfessionalSummyForm = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      if (!data || data.trim() === "") {
        toast.error("Please write a summary first");
        return;
      }

      setIsGenerating(true);

      const prompt = `Enhance my professional summary:\n${data}`;

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setResumeData(prev => ({
        ...prev,
        professional_summary: response.data.enhancedContent
      }));

    } catch (error) {
      console.log("ERROR:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-[#0F172A]'>
            Professional Summary
          </h3>
          <p className='text-sm text-[#0F172A]/50'>Add summary for your resume here</p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-[#DBEAFE] text-[#2563EB] rounded hover:bg-[#BFDBFE] transition-colors disabled:opacity-50'
        >
          {isGenerating
            ? <Loader2 className='size-4 animate-spin' />
            : <Sparkles className='size-4' />
          }
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className='mt-6'>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className='w-full p-3 mx-4 mt-2 border text-sm border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] rounded-lg focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors resize-none placeholder:text-[#0F172A]/30'
          placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
        />
        <p className='text-xs text-[#0F172A]/40 max-w-4/5 mx-auto text-center'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
}

export default ProfessionalSummyForm;