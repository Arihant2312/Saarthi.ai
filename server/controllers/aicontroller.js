import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary";
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';





const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
//generate articles
export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Corrected here
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "Your free usage limit has been reached. Please upgrade to a premium plan to continue writing articles.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      message: "Article created successfully",
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
// blog titles
export const blogtitles= async (req, res) => {
  try {
    const userId = req.userId; // ✅ Corrected here
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "Your free usage limit has been reached. Please upgrade to a premium plan to continue for blogging articles.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices[0].message.content;

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-article-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      message: "Article created successfully",
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//image generation
export const generateimage= async (req, res) => {
  
  try {
    
    const userId = req.userId; // ✅ Corrected here
    const { prompt,publish } = req.body;

    const plan = req.plan;
   // const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "only avaiable to create images in premium plan.",
      });
    }

    const formData= new FormData()
formData.append('prompt', prompt)
const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
  headers:{
     'x-api-key':process.env.CLIP_DROP_API,
  },
  responseType:"arraybuffer"
})

const baseimage = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

//cloudinary uplaod
const { secure_url } = await cloudinary.uploader.upload(baseimage);

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url},'image', ${publish??false} )`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({
      success: true,
      message: "Article created successfully",
      content:secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//image backgrouund remove
export const removeimagebackground= async (req, res) => {
  
  try {
    
    const {userId } =await req.auth(); // ✅ Corrected here
    const { image } = req.file;
   // const plan=req.plan

    const plan = req.plan;
   // const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "only avaiable to create images in premium plan.",
      });
    }





//cloudinary uplaod
const { secure_url } = await cloudinary.uploader.upload(image.path,{transformation:[
  {
    effect:'background_removal',
    background_removal:'remove_the_background',
  }
]});

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId},'Remove background from image', ${secure_url},'image' )`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({
      success: true,
      message: "background image removal created successfully",
      content:secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//remove objects
export const removeimageobject= async (req, res) => {
  
  try {
    
    const { userId } =await req.auth(); // ✅ Corrected here
    const { object } = req.body;
   // const plan=req.plan

    const plan = req.plan;
   // const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "can be accessed through premium plan only.",
      });
    }





//cloudinary uplaod
const { public_id } = await cloudinary.uploader.upload(image.path)
//removiing obect
const imageurl= cloudinary.url(public_id,{
  transformation:[{
    effect:`remove_objects`,
    remove_objects:object,
  }],
  resource_type:'image',
})
 

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId},${`removed ${object} from image`}, ${imageurl},'image' )`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({
      success: true,
      message: "object removal created successfully",
      content:imageurl,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const resumereview= async (req, res) => {
  
  try {
    
    const { userId } =await req.auth(); // ✅ Corrected here
   // const { object } = req.body;
   // const plan=req.plan
   const resumefile=req.file;

    const plan = req.plan;
   // const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "can be accessed through premium plan only.",
      });
    }





//check file size
if(resumefile.size>10*1024*1024){
  return res.json({
    success: false,
    message: "Resume file size should not exceed 10MB.",
  });
}

//resume file upload
const databuffer=fs.readFileSync(resumefile.path)
const pdfdata=await pdf(databuffer)
const prompt=`Review the follwing ressume and provide feedback on its strengths ,weaknesses and areas for improvement. resume content:\n\n ${pdfdata.text}`
//google gemini

const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content=response.choices[0].message.content;

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId},'Review the uplaoded resume', ${content},'Resume Review' )`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({
      success: true,
      message: "resume review created successfully",
      content:content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const summarizearticle= async (req, res) => {
  
  try {
    
    const { userId } =await req.auth(); // ✅ Corrected here
   // const { object } = req.body;
   // const plan=req.plan
   const article=req.file;

    const plan = req.plan;
   // const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "can be accessed through premium plan only.",
      });
    }





//check file size
if(article.size>30*1024*1024){
  return res.json({
    success: false,
    message: "Resume file size should not exceed 30MB.",
  });
}

//resume file upload
const databuffer=fs.readFileSync(article.path)
const pdfdata=await pdf(databuffer)
const prompt = `
You are an academic tutor. Read the document and provide a clear, structured response with the following sections:

### 📘 Main Purpose
Summarize the main goal or objective of the document.

### ✅ Key Points
List the major themes, arguments, or focus areas covered.

### 🛠️ Suggestions for Improvement
Suggest what specific information, clarification, or additions could make the document more helpful or complete for student understanding.

Document:
${pdfdata.text}
`;

//google gemini

const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens:2000,
    });
    const content=response.choices[0].message.content;

    // ✅ Use userId instead of undefined userid
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId},'Review the upladed document', ${content},'Article summarizer' )`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({
      success: true,
      message: "article sumamrized created successfully",
      content:content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
