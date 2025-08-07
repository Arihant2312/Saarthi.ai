import React, { useState } from 'react'
import { Sparkles,Newspaper } from 'lucide-react'

const Summarisetext = () => {
    const [input, setinput] = useState('')
        const onsubmithandler = async (e) => {
          e.preventDefault();
        }

    return (
<div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#eae46c]' />
          <h1 className='text-xl font-semibold'>Summarize Articles</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Upload your article</p>
<input
  type="file"
  accept="application/pdf"
  required
  onChange={(e) => setinput(e.target.files[0])}
  className="w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400 text-gray-600"
/>
       {/* // <p className='mt-4 text-base font-medium'>Category</p>
        <div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
          {blogcategories.map((item) => (
            <span onClick={() =>setselcateg(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selcat === item ? 'bg-purple-100 text-purple-700' : 'text-gray-500 border-gray-300'} `} key={item}>{item}</span>

          ))}
        </div>
        <br /> */}
        <p className='text-sm text-gray-500 font-light mt-1'>Supports PDF Resumes only.</p>
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ece452] to-[#eff17c] text-blue-950 px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>
          <Newspaper className='w-5 ' />
          Summarize Article
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Newspaper className='w-5 h-5 text-[#eae46c]' />
          <h1 className='text-xl font-semibold'>Analysis Results </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Newspaper className='w-9 h-9 ' />
            <p>Upload an Article and click <span className='text-primary'>"Summarize Article"</span> to get started</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Summarisetext