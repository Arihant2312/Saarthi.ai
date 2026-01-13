
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary";
import FormData from 'form-data';

import streamifier from "streamifier";

import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  
});
//console.log("GoogleGenAI loaded:", typeof GoogleGenAI);



//article generation
export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium.",
      });
    }

    // 🔥 SHORTER, FASTER PROMPT
    const enhancedPrompt = `
Write a professional article on the topic below.

Rules:
- About ${length || 600} words
- Clear introduction
- Well-structured paragraphs
- Professional tone
- No emojis
- No markdown
- Make headings and key lines bold

Topic:
${prompt}
`;

    // ⚡ FAST GEMINI CALL
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",     // ✅ fastest & most stable
      contents: enhancedPrompt,
      temperature: 0.4,            // lower randomness = faster
      maxOutputTokens: 700,        // cap output
    });

    const content = response.text;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({
      success: true,
      message: "Article created successfully",
      content,
    });

  } catch (error) {
    console.error("ARTICLE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
    });
  }
};

// blog titles

export const blogtitles = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    // 🔐 Auth check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🚫 Free usage limit
    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "Your free usage limit has been reached. Please upgrade to a premium plan.",
      });
    }

    // ✅ Gemini call (NEW SDK – WORKING)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite", // ✅ safest model
      contents: prompt,
      temperature: "0.5",
      max_tokens: "500",
    });

    const content = response.text;

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-article-title')
    `;

    // 📈 Update free usage
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // ✅ Response
    res.json({
      success: true,
      message: "Blog title generated successfully",
      content,
    });

  } catch (error) {
    console.error("BLOG TITLE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate blog title",
    });
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

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Stream upload to Cloudinary
    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { transformation: [{ effect: "background_removal" }] },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(req.file.buffer);
    const secure_url = result.secure_url;

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
    res.status(500).json({ success: false, message: error.message });
  }
};

//remove objects
//remove objects

//under maiintenance

export const removeimageobject = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (!image || !image.buffer) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature can only be accessed through the premium plan.",
      });
    }

    // Function to upload buffer to Cloudinary with generative removal
    const streamUpload = (buffer, prompt) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { transformation: [{ effect: "gen_remove" }], context: { prompt } },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    // Upload image with object removal
    const result = await streamUpload(image.buffer, object);
    const secure_url = result.secure_url;

    // Save to database
    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (${userId}, ${`removed ${object} from image`}, ${secure_url}, 'image')
    `;

    res.json({
      success: true,
      message: "Object removal created successfully",
      content: secure_url,
    });
  } catch (error) {
    console.error("Error during object removal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const resumereview = async (req, res) => {
  try {
    const userId = req.userId;   // keep consistent
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Accessible through premium plan only.",
      });
    }

    const resumefile = req.file;

    if (!resumefile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (resumefile.size > 10 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size should not exceed 10MB.",
      });
    }

    // 📄 Extract text from PDF
    const pdfdata = await pdf(resumefile.buffer);

    const reviewPrompt = `
You are a professional HR resume reviewer.

Review the resume below and provide:
1. Strengths
2. Weaknesses
3. Areas for improvement
4. Overall feedback

Resume Content:
${pdfdata.text}
`;

    // ✅ Gemini call (CORRECT)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: reviewPrompt,
    });

    const content = response.text;

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'Resume Review')
    `;

    res.json({
      success: true,
      message: "Resume review created successfully",
      content,
    });

  } catch (error) {
    console.error("RESUME REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const summarizearticle = async (req, res) => {
  try {
    const userId = req.userId;       // consistent with other controllers
    const plan = req.plan;
    const article = req.file;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Can be accessed through premium plan only.",
      });
    }

    if (!article) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded.",
      });
    }

    // 📏 File size check (30MB)
    if (article.size > 30 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Document size should not exceed 30MB.",
      });
    }

    // 📄 Extract text from PDF
    const pdfdata = await pdf(article.buffer);

    const summaryPrompt = `
You are an academic tutor.

Read the document below and respond in a clear, structured manner with these sections:

Main Purpose:
- Summarize the main goal or objective of the document.

Key Points:
- List the major themes, arguments, or focus areas.

Suggestions for Improvement:
- Suggest specific additions, clarifications, or improvements that would help a student better understand the document.

Document Content:
${pdfdata.text}
`;

    // ✅ Gemini call (NEW SDK ONLY)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",   // safest & stable
      contents: summaryPrompt,
    });

    const content = response.text;

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Summarize uploaded document',
        ${content},
        'Article Summarizer'
      )
    `;

    res.json({
      success: true,
      message: "Article summarized successfully",
      content,
    });

  } catch (error) {
    console.error("ARTICLE SUMMARY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to summarize document",
    });
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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      temperature: 0.9,
      max_tokens: 1000,
    });
        
    

    // Some SDKs return response.choices[0].message, others response.choices[0].text
const content =
  response.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
console.log("Music generation content:", content);

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

