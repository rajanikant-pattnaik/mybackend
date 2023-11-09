const mongoose = require("mongoose");

const membershipClosureSchema=new mongoose.Schema({
    closureDate:{
        type:Date,
        required:true
    },
    serialNumber:{
        type:String,
        required:true
    },
    memberName:{
        type:String,
        required:true
    },
    closureType:{
        type:String,
        required:true
    } 
})

const membershipClosure = mongoose.model("membershipclosures", membershipClosureSchema);

module.exports = membershipClosure;