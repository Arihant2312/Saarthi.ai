import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';


function RemoveObject() {
  const [input,setinput]=useState('')
  const [object,setobject]=useState('')
  const [loading,setloading]=useState(false)
  const [content,setcontent]=useState('')
  const {getToken}= useAuth();
  const onsubmithandler = async (e) => {
    e.preventDefault();

    // Show maintenance toast
    toast.error("Object removal feature is under maintenance. Please try later.");

    // Stop further execution
    return;

    /*
    try {
      setloading(true);

      if (object.split(' ').length > 1) {
        toast.error('Please enter only single object name');
        setloading(false);
        return;
      }
      const formdata = new FormData();
      formdata.append('image', input);
      formdata.append('object', object);
      const { data } = await axios.post('/api/ai/remove-image-object', formdata, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setcontent(data.content);
        toast.success('Object removed successfully');
        console.log(data.message);
      } else {
        toast.error(data.message);
        //console.log(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
    setloading(false);
    */
  }
  return (
      <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Upload Image</p>
<input
  type="file"
  accept="image/*"
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
         <p className='mt-6 text-base font-medium'>Describe Object name to remove</p>
        <textarea onChange={(e) => setobject(e.target.value)} rows={4} value={object} type="text" className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400' placeholder='e.g., watch or spoon, or only single object name' required />
        <button  disabled={loading}   className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>
         
         {
          loading? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'> </span>:<Scissors className='w-5 ' />
         } 
          Remove Object
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Scissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image </h1>
        </div>
        {!content?( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Scissors className='w-9 h-9 ' />
            <p>Upload an image and click <span className='text-primary'>"Remove Object"</span> to get started</p>
          </div>
        </div>):(
          <img src={content} alt="image" className='mt-4 w-full h-full '/>)}
       

      </div>
    </div>
  )
}

export default RemoveObject