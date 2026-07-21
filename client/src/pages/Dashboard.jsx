import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { all } from 'axios';
const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const colors = ['#9333ea', '#d97706', '#dc22626', '#0284c7', '#16a34a'];

  const navigate = useNavigate();
  const loadAllResumes = async () => {
  try {
    const { data } = await api.get('/api/resumes', { headers: { Authorization: `Bearer ${token}` } })
    setAllResumes(data.resumes)
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message)
  }
}

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: `Bearer ${token}` } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`)
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    }
  }
const uploadResume = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // ── Validation ──────────────────────────────────────────────────────────
    if (!resume) {
      toast.error("Please select a PDF file");
      return; // finally will handle setIsLoading(false)
    }

    if (resume.type !== "application/pdf") {
      toast.error("Only PDF files allowed");
      return;
    }

    // ── Build form data ─────────────────────────────────────────────────────
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("title", title);

    // ── API call ────────────────────────────────────────────────────────────
    const { data } = await api.post("/api/ai/upload-resume", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // ✅ Bug 2 fix
      },
    });

    console.log("UPLOAD RESPONSE:", data);

    // ── Handle response ─────────────────────────────────────────────────────
    if (data.resume) {
      toast.success("Resume uploaded successfully");

      setAllResumes((prev) => [...prev, data.resume]);

      // ✅ Reset form only on success
      setTitle("");
      setResume(null);
      setShowUploadResume(false);

      navigate(`/app/builder/${data.resume._id}`, {
        state: { parsedData: data.parsedData },
      });
    } else {
      toast.error("Resume not returned from server");
    }

  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || err.message);
  } finally {
    setIsLoading(false); // ✅ Bug 1 & 4 fix — always runs, single place
  }
};
  const editTitle = async (event) => {
    try{
      event.preventDefault();
        const { data } = await api.put(`/api/resumes/update`, {resumeId:editResumeId,resumeData:{title}},{ headers: { Authorization: `Bearer ${token}` } })
  setAllResumes(allResumes.map(resume =>
  resume._id === editResumeId ? { ...resume, title } : resume
));
   setTitle('')
   setEditResumeId('')
   toast.success(data.message)
    }catch(err){
      toast.error(err?.response?.data?.message || err.message);

    }

  }
  const deleteResume = async (resumeId) => {
    try{

      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: `Bearer ${token}` } })
        setAllResumes(allResumes.filter(resume=>resume._id!==resumeId))
        toast.success(data.message);
      }
    }catch(err){
      toast.error(err?.response?.data?.message || err.message);
    }

  }

  useEffect(() => {
    loadAllResumes();
  }, [])
  return (
    <div>
  <div className='max-w-7xl mx-auto px-4 py-8'>

    <p className='text-2xl font-medium mb-6 text-[#0F172A] sm:hidden'>
      Welcome {user.name}
    </p>

    <div className='flex gap-4'>

      {/* Create Resume */}
      <button
        onClick={() => setShowCreateResume(true)}
        className='w-full bg-[#F8FAFC] sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-[#0F172A]/60 border border-dashed border-[#E2E8F0] group hover:border-[#2563EB] hover:shadow-lg transition-all duration-300 cursor-pointer'
      >
        <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-[#2563EB] text-white rounded-full' />
        <p className='text-sm group-hover:text-[#2563EB] transition-all duration-300'>Create Resume</p>
      </button>

      {/* Upload Existing */}
      <button
        onClick={() => setShowUploadResume(true)}
        className='w-full bg-[#F8FAFC] sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-[#0F172A]/60 border border-dashed border-[#E2E8F0] group hover:border-[#2563EB] hover:shadow-lg transition-all duration-300 cursor-pointer'
      >
        <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-[#DBEAFE] text-[#2563EB] rounded-full' />
        <p className='text-sm group-hover:text-[#2563EB] transition-all duration-300'>Upload Existing</p>
      </button>

    </div>

    <hr className='border-[#E2E8F0] my-6 sm:w-[305px]' />

    {/* Resume Grid */}
    <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
      {allResumes.map((resume, index) => {
        const baseColor = colors[index % colors.length];
        return (
          <button
            key={index}
            onClick={() => navigate(`/app/builder/${resume._id}`)}
            className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
            style={{ background: `linear-gradient(135deg,${baseColor}10,${baseColor}40)`, borderColor: baseColor + '40' }}
          >
            <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
            <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>
              {resume.title}
            </p>
            <p className='absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
              Updated on {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
            <div onClick={(e) => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
              <TrashIcon
                onClick={(e) => { e.stopPropagation(); deleteResume(resume._id); }}
                className='size-7 p-1.5 hover:bg-white/50 rounded text-[#0F172A]/60 transition-colors'
              />
              <PencilIcon
                onClick={(e) => { e.stopPropagation(); setEditResumeId(resume._id); setTitle(resume.title); }}
                className='size-7 p-1.5 hover:bg-white/50 rounded text-[#0F172A]/60 transition-colors'
              />
            </div>
          </button>
        );
      })}
    </div>

    {/* Create Resume Modal */}
    {showCreateResume && (
      <div
        onClick={() => setShowCreateResume(false)}
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center'
      >
        <form
          onSubmit={createResume}
          onClick={(e) => e.stopPropagation()}
          className='relative bg-[#F8FAFC] border border-[#E2E8F0] shadow-md rounded-lg w-full max-w-sm p-6'
        >
          <h2 className='text-xl font-bold mb-4 text-[#0F172A]'>Create a Resume</h2>
          <input
            type="text"
            placeholder='Enter Resume Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 mb-4 border border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#0F172A]/30 rounded focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all'
            required
          />
          <button className='w-full py-2 bg-[#2563EB] text-white rounded hover:bg-[#1D4ED8] transition-colors'>
            Create Resume
          </button>
          <XIcon
            className='absolute top-4 right-4 text-[#0F172A]/30 hover:text-[#0F172A]/60 cursor-pointer'
            onClick={() => setShowCreateResume(false)}
          />
        </form>
      </div>
    )}

    {/* Upload Resume Modal */}
    {showUploadResume && (
      <div
        onClick={() => setShowUploadResume(false)}
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center'
      >
        <form
          onSubmit={uploadResume}
          onClick={(e) => e.stopPropagation()}
          className='relative bg-[#F8FAFC] border border-[#E2E8F0] shadow-md rounded-lg w-full max-w-sm p-6'
        >
          <h2 className='text-xl font-bold mb-4 text-[#0F172A]'>Upload a Resume</h2>
          <input
            type="text"
            placeholder='Enter Resume Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 mb-4 border border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#0F172A]/30 rounded focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all'
            required
          />
          <div>
            <label htmlFor="resume-input" className='block text-sm text-[#0F172A]/70'>
              Select resume file
              <div className='flex flex-col items-center justify-center gap-2 border border-[#E2E8F0] p-4 py-10 my-4 hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-colors rounded-lg'>
                {resume ? (
                  <p className='text-[#2563EB]'>{resume.name}</p>
                ) : (
                  <>
                    <UploadCloud className='size-14 stroke-1 text-[#2563EB]/50' />
                    <p className='text-[#0F172A]/50'>Upload resume</p>
                  </>
                )}
              </div>
            </label>
            <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
          </div>
          <button
            disabled={isLoading}
            className='w-full py-2 bg-[#2563EB] text-white rounded hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
          >
            {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
            {isLoading ? 'Uploading...' : 'Upload Resume'}
          </button>
          <XIcon
            className='absolute top-4 right-4 text-[#0F172A]/30 hover:text-[#0F172A]/60 cursor-pointer'
            onClick={() => setShowUploadResume(false)}
          />
        </form>
      </div>
    )}

    {/* Edit Title Modal */}
    {editResumeId && (
      <div
        onClick={() => setEditResumeId('')}
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center'
      >
        <form
          onSubmit={editTitle}
          onClick={(e) => e.stopPropagation()}
          className='relative bg-[#F8FAFC] border border-[#E2E8F0] shadow-md rounded-lg w-full max-w-sm p-6'
        >
          <h2 className='text-xl font-bold mb-4 text-[#0F172A]'>Edit Resume Title</h2>
          <input
            type="text"
            placeholder='Enter Resume Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 mb-4 border border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#0F172A]/30 rounded focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all'
            required
          />
          <button className='w-full py-2 bg-[#2563EB] text-white rounded hover:bg-[#1D4ED8] transition-colors'>
            Update
          </button>
          <XIcon
            className='absolute top-4 right-4 text-[#0F172A]/30 hover:text-[#0F172A]/60 cursor-pointer'
            onClick={() => { setEditResumeId(''); setTitle(''); }}
          />
        </form>
      </div>
    )}

  </div>
</div>
  );
}

export default Dashboard;



