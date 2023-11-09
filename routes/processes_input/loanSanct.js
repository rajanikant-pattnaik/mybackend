const express = require("express");
const LoanSanct = require("../../models/loanSanction");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      date,
      sanctionNo,
      member,
      loanScheme,
      noOfInstallment,
      sanctionAmount,
      netAmount,
      collectionToStart,
      paymentMode,
      chequeNo,
      monthlyDeduction,
      interest,
      cashOrBank,
    } = req.body;
    const newData = new LoanSanct({
      date,
      sanctionNo,
      member,
      loanScheme,
      noOfInstallment,
      sanctionAmount,
      netAmount,
      collectionToStart,
      paymentMode,
      chequeNo,
      monthlyDeduction,
      interest,
      cashOrBank,
    });

    const saveData = await newData.save();
    return res.status(201).json({
      success: true,
      message: "loan is finally sanctioned",
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

router.put("/close", async (req, res) => {
  try {
    const { loanSanctionNo, closureDate } = req.body;
    const loanData = await LoanSanct.findOne({ sanctionNo: loanSanctionNo });
    loanData.closeDate = closureDate;
    await loanData.save();
    return (
      res.status(201).json({
        success: true,
        message: "finally loan is closed",
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.put("/adjust", async (req, res) => {
  try {
    const { sanctionNo, principalAdjustment, interestAmount } = req.body;
    const data = await LoanSanct.findOne({ sanctionNo: sanctionNo });
    data.netAmount = principalAdjustment;
    data.interest = interestAmount;
    const saveData = await data.save();
    return res.status(201).json({
      success: true,
      message: "loan adjusted successfully",
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

router.get("/get/:id", async (req, res) => {
  try {
    const sanctNo = req.params.id;
    const data = await LoanSanct.findOne({ sanctionNo: sanctNo });
    return res.status(201).json({
      success: true,
      message: "loan adjusted successfully",
      name: data.member,
      scheme: data.loanScheme,
      amount: data.sanctionAmount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.get("/get/:loanScheme", async (req, res) => {
  try {
    const lonScheme = req.params.loanScheme;
    const data = await LoanSanct.find({ loanScheme: lonScheme });
    return res.status(201).json({
      success: true,
      message: "loan adjusted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});
router.get("/get/:mName", async (req, res) => {
  try {
    const lonScheme = req.params.mName;
    const data = await LoanSanct.find({ memberName: mName });
    return res.status(201).json({
      success: true,
      message: "loan adjusted successfully",
      data,
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
