const mongoose = require('mongoose');

const cashtransSchema=new mongoose.Schema({
    partyName:{
        type:String,
        required:true
    },
    voucherNo:{
        type:Number,
        required:true,
    },
    voucherType:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    narration:String,
    accountHead:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const cashtrans = mongoose.model('cashtrans', cashtransSchema);

module.exports = cashtrans;