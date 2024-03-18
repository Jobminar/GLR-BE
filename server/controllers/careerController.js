import { get } from "mongoose";
import Career from "../models/careerModel.js";

const careerController={

    createCareer:async(req,res)=>{
        try{
    const {postName,description,link,uploadDate,validDate}=req.body
    
    if(!postName || !description || !link || !uploadDate || !validDate){
        return res.status(400).json({message:"Required fields postName,description,link,uploadDate,validDate"})
    }

    const newCareer=new Career({postName,description,link,uploadDate,validDate})
    const savedCareer=await newCareer.save()
    res.status(201).json({message:"Successfully data added ",savedCareer})
        }
        catch(error){
            res.status(500).json({error:'Internal server error'})
        }    
},
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