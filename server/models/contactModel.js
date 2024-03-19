import { Schema, model } from "mongoose";
const contacSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  purpose: { type: String, required: true },
});
const Contact = model("Contact", contacSchema);
export default Contact;
