import React, { useState } from 'react';
import { Sparkles, Music } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const MusicRecommend = () => {
  const musicstyle = [ 
    "Pop","Electronic","Jazz","Rock","Country","Hip-Hop","Folk","R&B","Reggae","Blues","Classical"
  ];

  const [selstyle, setselstyle] = useState('Pop');
  const [input, setinput] = useState('');
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState('');
  const { getToken } = useAuth();

  const onsubmithandler = async (e) => {
    e.preventDefault();
    if(!input) return;

    try {
      setloading(true);
      const token = await getToken();

const prompt = `
Generate 4-5 trending and popular "${input}" songs in the "${selstyle}" category.
Each song must follow this exact format:

1. 
  - Song Title: ...
  - Artist Name: ...
  - Key Details: ...
  

2. 
    - Song Title: ...
  - Artist Name: ...
  - Key Details: ...
 

Make sure:
- All details are under the number (nested)
- Each detail on its own line
Higlight the song title and artist name using bold markdown syntax.
- Clean formatting without extra symbols or messy layout
`;


      const { data } = await axios.post(
        '/api/ai/generate-music-recommendation',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(data.success){
        setcontent(data.content);
        toast.success('Music recommendations generated successfully');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form onSubmit={onsubmithandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#751352]" />
          <h1 className="text-xl font-semibold">AI Music Recommender</h1>
        </div>

        <p className="mt-6 text-base font-medium">Type Of</p>
        <input 
          value={input} 
          onChange={e => setinput(e.target.value)} 
          type="text" 
          placeholder="I want a gaming session music..." 
          className="w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400" 
          required 
        />

        <p className="mt-4 text-base font-medium">Category</p>
        <div className="mt-3 flex gap-4 flex-wrap">
          {musicstyle.map(item => (
            <span 
              key={item} 
              onClick={() => setselstyle(item)}
              className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selstyle === item ? 'bg-purple-100 text-purple-700' : 'text-gray-500 border-gray-300'}`}
            >
              {item}
            </span>
          ))}
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#be6bb9] to-[#9b3097] text-white px-4 py-3 mt-5 text-base rounded-lg"
        >
          {loading 
            ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            : <Music className="w-5" />}
          Generate recommendations
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-[300px]">
        <div className="flex items-center gap-3 mb-2">
          <Music className="w-5 h-5 text-[#751352]" />
          <h1 className="text-xl font-semibold">Recommended Music</h1>
        </div>

        {!content 
          ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 text-gray-500">
              <Music className="w-9 h-9"/>
              <p className="text-xs text-center">
                Enter the type of music and click <span className="text-primary">"Generate Recommendations"</span> to get started
              </p>
            </div>
          ) 
          : (
            <div className="overflow-y-scroll max-h-[500px] mt-2 text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
              
             
            </div>
          )
        }
      </div>
    </div>
  );
}

export default MusicRecommend;
