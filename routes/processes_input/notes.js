const express = require("express");
const notes = require("../../models/notes");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      partyName,
      voucherNo,
      details,
      amount,
      narration,
      accountHead,
      date,
      acName,
      debitCredit,
      receiptSent,
    } = req.body;

    const newData = new notes({
      partyName,
      voucherNo,
      details,
      amount,
      narration,
      accountHead,
      date,
      acName,
      debitCredit,
      receiptSent,
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
    const {
      date,
      voucherNo,
      receiptSent,
      debitCredit,
      acName,
      partyName,
      details,
    } = req.body;
    const currdata = await notes.find({
      date,
      voucherNo,
      receiptSent,
      debitCredit,
      acName,
      partyName,
      details,
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

router.post("/det", async (req, res) => {
  try {
    const { date, voucherNo } = req.body;
    const currdata = await notes.find({
      date,
      voucherNo,
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
