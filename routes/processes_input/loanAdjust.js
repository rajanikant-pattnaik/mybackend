const express = require('express');
const LoanAdjust = require('../../models/loanAdjust');
const router = express.Router();
router.post("/add", async (req, res) => {
    try {
      const {
        adjustmentDate,
        voucherNo,
        memberName,
        sanctionNo,
        type,
        loanScheme,
        principalAdjustment,
        interestAmount,
        debitAccount,
        creditAccount
      } = req.body;
  
      const newData = new LoanAdjust({
        adjustmentDate,
        voucherNo,
        memberName,
        sanctionNo,
        type,
        loanScheme,
        principalAdjustment,
        interestAmount,
        debitAccount,
        creditAccount
      });
      const saveData = await newData.save();
      return res.status(200).json({
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
module.exports = router;