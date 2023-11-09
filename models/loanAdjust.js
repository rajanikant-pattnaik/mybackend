const mongoose = require("mongoose");

const loanAdjustSchema=new mongoose.Schema({
    adjustmentDate:{
        type:Date,
        required:true 
    },
    voucherNo:{
        type:String,
        required:true
    },
    memberName:{
        type:String,
        required:true
    },
    sanctionNo:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    loanScheme:{
        type:String,
        required:true
    },
    principalAdjustment:{
        type:Number,
        required:true
    },
    interestAmount:{
        type:Number,
        required:true
    },
    debitAccount:{
        type:String,
        required:true
    },
    creditAccount:{
        type:String,
        required:true
    },
})

const LoanAdjust = mongoose.model("loanadjusts", loanAdjustSchema);

module.exports = LoanAdjust;