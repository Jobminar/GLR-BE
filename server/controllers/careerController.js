
import Career from "../models/careerModel.js";

import multer from 'multer'

const stoarge=multer.memoryStorage()
const upload=multer({storage:stoarge})

const careerController={

    createCareer:[ upload.single("careerImage"),
    
    async(req,res)=>{
        try{
    const {jobTitle,
        companyName,
        jobLocation,
        jobType,
        jobCategory,
        jobDescription,
        skills,
        experience,
        education,
        salary,
        applicationDead,
        applicationUrl,
        contactPerson,
        contactMobile,
        additionalField}=req.body
    
    if(! jobTitle ||
       ! companyName ||
       ! jobLocation ||
       ! jobType ||
       ! jobCategory ||
       ! jobDescription ||
       ! skills ||
       ! experience ||
       ! education ||
       ! salary ||
       ! applicationDead ||
       ! applicationUrl ||
       ! contactPerson ||
       ! contactMobile ||
       ! additionalField){
        return res.status(400).json({message:"Required fields missing "})
    }

    const newCareer=new Career({
        jobTitle,
        companyName,
        jobLocation,
        jobType,
        jobCategory,
        jobDescription,
        skills,
        experience,
        education,
        salary,
        applicationDead,
        applicationUrl,
        contactPerson,
        contactMobile,
        careerImage,
        additionalField})
    const savedCareer=await newCareer.save()
    res.status(201).json({message:"Successfully data added ",savedCareer})
        }
        catch(error){
            res.status(500).json({error:'Internal server error'})
        }  
      
}
    ],
    getAllCareer:async(req,res)=>{
        try{
       const getData=await Career.find()
       res.status(201).json(getData)
        }
        catch(error){
            res.status(500).json({error:"failed to get the data"})
        }
    }

}
export default careerController