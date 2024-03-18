import {model,Schema} from 'mongoose'

const blogsSchema=new Schema({
    blogName:{type:String,required:true},
    blogImage:{type:String,required:true},
    blogDescription:{type:String,required:true},
    uploadDate:{type:Date,default: Date.now },
    validDate:{type:String,default:true}
})
const Blogs=model("Blogs",blogsSchema)
export default Blogs