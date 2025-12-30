import React from 'react'
import { useState } from 'react'
import { Sparkles, Hash, Edit } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';

import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitles() {
  const blogcategories = [
    "General", "Travel", "technology", "Health", "LifeStyle", "Business", "Food", "Education", 'Sports'
  ]

  const [selcat, setselcateg] = useState('General')
  const [input, setinput] = useState('')
  const [loading, setloading] = useState(false)
  const [content, setcontent] = useState('')
  const { getToken } = useAuth()


  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const token = await getToken()
      const prompt = `Generate a blog title for "${input}" in the "${selcat}" category.`
      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (data.success) {
        setcontent(data.content)
        toast.success('Blog Title generated successfully')
      } else {
        toast.error(data.message)
      }

    }
    catch (error) {
      toast.error(error.message)

    }
    setloading(false)


  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#751352]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Keyword</p>
        <input onChange={(e) => setinput(e.target.value)} value={input} type="text" className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400' placeholder='the future of artificial intelligence is...' required />
        <p className='mt-4 text-base font-medium'>Category</p>
        <div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
          {blogcategories.map((item) => (
            <span onClick={() => setselcateg(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selcat === item ? 'bg-purple-100 text-purple-700' : 'text-gray-500 border-gray-300'} `} key={item}>{item}</span>

          ))}
        </div>
        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#be6bb9] to-[#9b3097] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>{loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Hash className='w-5 ' />}
          Generate Title

        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Hash className='w-5 h-5 text-[#751352]' />
          <h1 className='text-xl font-semibold'>Generated Title </h1>
        </div>
        {
          !content ? (<div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
              <Hash className='w-9 h-9 ' />
              <p>Enter a Topic and click <span className='text-primary'>"Generate Title"</span> to get started</p>
            </div>
          </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
              <div className='reset-tw'><Markdown>{content}</Markdown></div>

            </div>
          )
        }

      </div>
    </div>
  )
}

export default BlogTitles