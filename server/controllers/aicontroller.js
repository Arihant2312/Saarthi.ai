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
//import cloudinary from '../configs/cloudinary.js';




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
      message: "Image generated successfully",
      content:secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//image backgrouund remove
export const removeimagebackground = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Only available to create images in premium plan.",
      });
    }

    // ✅ req.file has path, filename, etc.
    const filePath = req.file.path;

    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({
      success: true,
      message: "Background image removal created successfully",
      content: secure_url,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//remove objects
//remove objects
export const removeimageobject= async (req, res) => {

  try {
    const { userId } =await req.auth();
    const image = req.file;

    if (!image) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const { object } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "This feature can only be accessed through the premium plan.",
      });
    }

    // First, upload the image to Cloudinary to get its public ID.
    // The image path comes from the multer middleware (req.file.path).
    const uploadResult = await cloudinary.uploader.upload(image.path);
    const publicId = uploadResult.public_id;

    // Use the `explicit` method to perform the generative removal.
    // This is the correct way to trigger the AI-powered processing.
    const removalResult = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      effect: 'gen_remove',
      prompt: object, // The object to remove, e.g., "car" or "person in red shirt"
    });

    // Get the secure URL of the new, processed image.
    const imageUrl = removalResult.secure_url;
    console.log("New image URL:", imageUrl);

    // Use userId and the new image URL to insert into your database.
    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId},${`removed ${object} from image`}, ${imageUrl},'image' )`;

    res.json({
      success: true,
      message: "Object removal created successfully",
      content: imageUrl,
    });

  } catch (error) {
    console.error("Error during object removal:", error.message);
    res.json({ success: false, message: error.message });
  }
};
export const resumereview = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Accessible through premium plan only.",
      });
    }

    const resumefile = req.file;

    if (!resumefile) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (resumefile.size > 10 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size should not exceed 10MB.",
      });
    }

    // Use buffer directly
    const pdfdata = await pdf(resumefile.buffer);
    const prompt = `Review the following resume and provide feedback on strengths, weaknesses, and areas for improvement. Resume content:\n\n${pdfdata.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'Resume Review')`;

    res.json({
      success: true,
      message: "Resume review created successfully",
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
export const musicgeneration = async (req, res) => {
  try {
    // Clerk: user is on req.auth (already populated by your auth middleware)
       const userId = req.userId;        // ✅ FIX: no await, no ()

    const { prompt } = req.body;        // coming from frontend
    const plan = req.plan;              // make sure you actually set req.plan in middleware

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // Call your AI model (adjust to your SDK)
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        
        { role: "user", 
          content: prompt },
        
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Some SDKs return response.choices[0].message, others response.choices[0].text
    const content =
      response.choices?.[0]?.message?.content ||
      response.choices?.[0]?.text ||
      "";

    // ✅ FIX: clean SQL insert
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId},'music....', ${content}, 'music-generation')
    `;

    res.json({
      success: true,
      message: "Music recommendations generated successfully",
      content,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

