const mongoose = require("mongoose");

const loanClosureSchema={
    memberName:{
        type:String,
        required:true
    },
    closureDate:{
        type:Date,
        required:true
    },
    loanSanctionNo:{
        type:String,
        required:true
    },
    loanScheme:{
        type:String,
        required:true
    },
    loanAmount:{
        type:Number,
        required:true
    },
    authorizedBy:{
        type:String,
        required:true
    },
}

const LoanClosure = mongoose.model("loanclosures", loanClosureSchema);

module.exports = LoanClosure;