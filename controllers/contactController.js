const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels")
//@desc get contacts
//access private
//routes GET /api/contacts
const getContacts =asyncHandler( async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc create new contact
//access public
//routes GET /api/contacts
const createContact = asyncHandler( async (req,res)=>{
    console.log("the req body is :" , req.body)
    const {name , email , phone } = req.body
    if(!name || !email || !phone){
        res.status(404)
        throw new Error("All feild mandatory")
    }

    const contact = await Contact.create({
        user_id : req.user.id,
        name,
        email,
        phone
    })
    res.status(201).json(contact)
})


//@desc get a contact
//access public
//routes GET /api/contacts/:id
const getContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json("Not Found")
    }
    res.status(200).json(contact)
})

//@desc update a contact
//access public
//routes GET /api/contacts/:id
const updateContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json("Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("you are not permitted to update other user's contact ")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact)
})

//@desc delete a contact
//access public
//routes GET /api/contacts/:id
const deleteContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json("Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("you are not permitted to delete other user's contact ")
    }

    await Contact.deleteOne({_id : req.params.id})
    res.status(200).json(contact)
})

module.exports = {getContacts , createContact, getContact , updateContact, deleteContact}