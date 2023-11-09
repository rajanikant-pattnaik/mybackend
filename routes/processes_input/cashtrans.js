const express = require("express");
const cashtrans = require("../../models/cashtrans");
const router = express.Router();
router.post("/add", async (req, res) => {
  try {
    const {
      partyName,
      voucherNo,
      voucherType,
      amount,
      narration,
      accountHead,
      date,
    } = req.body;
    const newData = new cashtrans({
      partyName,
      voucherNo,
      voucherType,
      amount,
      narration,
      accountHead,
      date,
    });

    const saveData = await newData.save();
    return res.status(200).json({
      success: true,
      message: "cash added successfully",
      saveData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.post("/details", async (req, res) => {
  try {
    const { date, voucherNo, voucherType } = req.body;
    console.log(date)
    console.log(voucherNo)
    console.log(voucherType)
    const currdata = await cashtrans.find({ date, voucherNo, voucherType });
    if(!currdata){
        return res.status(500).json({
            success:false,
            message:'No such value  is there'
        })
    }
    console.log(currdata);
    const arrayData = currdata.map((item, i = 0) => {
      return {
        sl: i + 1,
        accountHead: item.accountHead,
        partyName: item.partyName,
        narration: item.narration,
        amount: item.amount,
        balance: item.amount,
      };
    });

    return res.status(201).json({
      succes: true,
      message: "Data is shown",
      arrayData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

module.exports = router;
