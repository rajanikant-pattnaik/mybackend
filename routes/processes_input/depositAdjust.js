const express = require("express");
const depositAdjust = require("../../models/depositAdjust");
const deposit = require("../../models/deposit");

const router = express.Router();
router.post("/add&update", async (req, res) => {
  try {
    const {
      memberName,
      depositScheme,
      adjustmentAmount,
      voucherNo,
      adjustmentDate,
      type,
      debitAccount,
      creditAccount,
    } = req.body;

    const currData = await depositAdjust.findOne({
      name: memberName,
      depositScheme: depositScheme,
    });
  //  console.log(currData);
    const newDepData = new deposit({
      name: memberName,
      depositScheme,
      amount: adjustmentAmount,
      date:adjustmentDate,
      type,
      debitAccount,
      creditAccount,
      voucherNo
    });
    await newDepData.save();
    if (!currData) {
      const newData = new depositAdjust({
        name: memberName,
        depositScheme,
        principalAdjustment: adjustmentAmount,
      });
      const saveData = await newData.save();
      return res.status(200).json({
        success: true,
        message: "deposit adjusted successfully",
        saveData,
      });
    }
    currData.principalAdjustment = adjustmentAmount;
    const saveData = await currData.save();
    return res.status(200).json({
      success: true,
      message: "deposit adjusted successfully",
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

router.get("/find", async (req, res) => {
  try {
    const { memberName, depositScheme } = req.body;
    const currData = await depositAdjust.findOne({
      name: memberName,
      depositScheme: depositScheme,
    });
    return res.status(200).json({
      success: true,
      message: "deposit adjusted successfully",
      currData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error has occured.",
    });
  }
});

router.get("/getbyDepositScheme", async (req, res) => {
  try {
    const { depositScheme } = req.body;
    const currData = await depositAdjust.find({
      depositScheme: depositScheme,
    });

    return res.status(200).json({
      success: true,
      message: "deposit adjusted successfully",
      currData,
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
