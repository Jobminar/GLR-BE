import { model,Schema } from "mongoose";
const careerSchema=new Schema({
    postName:{type:String,required:true},
    description:{type:String,required:true},
    link:{type:String,required:true},
    uploadDate:{type:Date,default:Date.now},
    validDate:{type:String,default:Date}
})
const Career=model("Career",careerSchema)
export default Career