const express = require("express");
const app = express();
const dotenv=require('dotenv')
const mongoose= require('mongoose')
const cors = require('cors');
const port = 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const branchroute=require('./routes/masterlist/branch')
const accountgroup=require('./routes/masterlist/accountgroup')
const accounthead=require('./routes/masterlist/accounthead')
const parties =require('./routes/masterlist/parties')
const depositescheme= require("./routes/masterlist/depositescheme")
const typeofloan = require("./routes/masterlist/typeofloan")
const voucher=require("./routes/masterlist/vouchernarration")


dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to MongoDB")).catch((err)=>{console.log(err);});

app.use("/api/branch",branchroute)
app.use("/api/accountgroup",accountgroup)
app.use("/api/accounthead",accounthead)
app.use('/api/parties',parties)
app.use("/api/deposite",depositescheme)
app.use("/api/typeofloan",typeofloan)
app.use('/api/voucher',voucher)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
