
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "User"
    },
    name: {
        type:String,
        required: [true, "Please Add contact Name"]
    },
    email: {
        type:String,
        required: [true, "Please Add email adress"]
    },
    phone: {
        type:String,
        required: [true, "Please Add contact number"]
    },   
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Contact', schema)