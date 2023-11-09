const express = require("express");
const router = express.Router();

const loanApp = require("../../models/loanApp.js");
const TypeOfLoan=require("../../models/typeOfLoan");

router.post("/add", async (req, res) => {
  try {
    const {
      applicationNo,
      date,
      memberName,
      depositAmount,
      shareAmount,
      loanScheme,
      loanAmount,
      installments,
      loanPurpose,
      place,
    } = req.body;

    const newData = new loanApp({
      applicationNo,
      date,
      memberName,
      depositAmount,
      shareAmount,
      loanScheme,
      loanAmount,
      installments,
      loanPurpose,
      place,
    });

    const saveData = await newData.save();

    return res.status(200).json({
      sucess: true,
      message: "loan application sent successfully",
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

module.exports = router;

router.get("/get/:id", async (req, res) => {
  try {
    const AppNo = req.params.id;
    const data = await loanApp.findOne({ applicationNo: AppNo });
    const loanType = await TypeOfLoan.findOne({ name: data.loanScheme });
    return res.status(200).json({
      success: true,
      message: "data is shown",
      amount: data.loanAmount,
      installments: data.installments,
      name: data.memberName,
      id: data._id,
      loanScheme: data.loanScheme,
      maxEmi: loanType.maximumemi,
      maxLoan: loanType.maximumloan,
      interest: loanType.interest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await loanApp.findById(id);
    const deleteData = await data.deleteOne();
    return res.status(200).json({
      success: true,
      message: "loan application  is deleted",
      deleteData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});
