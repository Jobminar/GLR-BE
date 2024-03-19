import Contact from "../models/contactModel.js";

const contactController = {
  createContact: async (req, res) => {
    try {
      const { email, phoneNo, name, purpose } = req.body;
      if (!email || !phoneNo || !name || !purpose) {
        return res.status(400).json({ message: "Required fields are mandatory: email, phoneNo, name, purpose" });
      }

      const newContact = new Contact({ email, phoneNo, name, purpose });
      const savedContact = await newContact.save();
      res.status(201).json({ message: "successfully data added ", savedContact });
    } catch (error) {
        console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllContact: async (req, res) => {
    try {
      const getData = await Contact.find();
      res.status(200).json(getData);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve contacts" });
    }
  },
};
export default contactController;
