import { get } from "mongoose";
import Blogs from "../models/blogsModel.js";

import multer from 'multer'

const storage=multer.memoryStorage()
const upload=multer({storage:storage})

const blogsController={

    createBlogs:[upload.single("blogImage"),
    async(req,res)=>{
        try{
            const {blogName,blogDescription,uploadDate,validDate}=req.body

           

             if(!req.file){
                return res.status(400).json({message:"Required blogImage "})
             }
             const blogImage=req.file.buffer.toString("base64")

            if(!blogName || !blogImage || !blogDescription || !uploadDate ||!validDate){
                return res.status(400).json({message:"Required fileds blogName blogDescription uploadDate validDate"})
            }
           
            const newBlog=new Blogs({blogName,blogImage,blogDescription,uploadDate,validDate})
            const savedBlog=await newBlog.save()
            res.status(201).json({message:"Successfully added the data",savedBlog})
            
        }
        catch(error){
            res.status(500).json({error:'Internal server error'})
        }
    }
    ],
    getAllBlogs:async(req,res)=>{
        try{
        const getData=await Blogs.find()
        res.status(201).json(getData)
        }
        catch(error){
            return res.status(500).json({error:"Failed to get all the data"})
        }
    }
}
export default blogsController