const express = require("express");
const banktrans = require("../../models/banktrans");
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
      bankAccount,
      chequeNo,
      chequeDate,
    } = req.body;
    const newData = new banktrans({
      partyName,
      voucherNo,
      voucherType,
      amount,
      narration,
      accountHead,
      date,
      bankAccount,
      chequeNo,
      chequeDate,
    });

    const saveData = await newData.save();
    return res.status(200).json({
      success: true,
      message: "bank transaction added successfully",
      saveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.post("/details", async (req, res) => {
  try {
    const { voucherNo, voucherType, date, bankAccount, chequeNo, chequeDate } =
      req.body;
    const currdata = await banktrans.find({
      date,
      voucherNo,
      voucherType,
      bankAccount,
      chequeNo,
      chequeDate,
    });
    if (!currdata) {
      return res.status(500).json({
        success: false,
        message: "No such value  is there",
      });
    }
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
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

module.exports = router;
