const express = require('express');
const membershipClosure = require('../../models/membershipClosure');
const router = express.Router();
router.post("/add", async (req, res) => {
    try {
      const {
        closureDate,
        serialNumber,
        memberName,
        closureType
      } = req.body;
  
      const newData = new membershipClosure({
        closureDate,
        serialNumber,
        memberName,
        closureType
      });
      const saveData = await newData.save();
      return res.status(200).json({
        success: true,
        message: "membership closed successfully",
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