import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function ReviewResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('resumefile', file);

    try {
      setLoading(true);
      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setContent(data.content);
        toast.success('Resume reviewed successfully');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full overflow-y-scroll p-4 flex items-start flex-wrap gap-2 text-slate-700'>
      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-base font-medium'>Upload your resume (PDF only)</p>
        <input
          type='file'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
          className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400 text-gray-600'
        />

        <p className='text-sm text-gray-500 font-light mt-1'>Supports PDF resumes only.</p>

        <button
          type='submit'
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <FileText className='w-5' />
          )}
          Review Resume
        </button>
      </form>

      {/* Result */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {content ? (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <FileText className='w-9 h-9' />
              <p>Upload a Resume and click "Review Resume" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewResume;
