const express = require("express");
const LoanClosure = require("../../models/loanClosure");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      memberName,
      closureDate,
      loanSanctionNo,
      loanScheme,
      loanAmount,
      authorizedBy,
    } = req.body;

    const newData = new LoanClosure({
      memberName,
      closureDate,
      loanSanctionNo,
      loanScheme,
      loanAmount,
      authorizedBy,
    });
    const saveData = await newData.save();
    return res.status(200).json({
      success: true,
      message: "loan closed successfully",
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
