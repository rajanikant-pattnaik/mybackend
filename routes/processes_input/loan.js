const express = require("express");
const Parties = require("../../models/parties");
const TypeOfLoan = require("../../models/typeofloan");
const Loan = require("../../models/loan");
const router = express.Router();

router.post("/apply", async (req, res) => {
  try {
    const { mId, lId, intrst, emi, roi, lamt, alft, noI } = req.body;

    const mData = await Parties.findById(mId);
    if (!mData) {
      return res.json({
        success: false,
        message: "please enter a valid party Id",
      });
    }
    const lData = await TypeOfLoan.findById(lId);
    if (!lData) {
      return res.json({
        success: false,
        message: "please enter a valid loan type",
      });
    }

    const newData = new Loan({
      name: mData.name,
      memberId: mId,
      loanTypNme: lId.name,
      loanTypId: lId,
      interest: intrst,
      emi: emi,
      roi: roi,
      loanAmt: lamt,
      amtLeft: alft,
      noofInst: noI,
    });
    await newData.save();

    return res.json({
      success: true,
      message: "laon applied successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.get("/showApp", async (req, res) => {
  try {
    const data = await Loan.where({ sanction: false });
    return res.json({
      success: true,
      message: "all the loan applications that are waiting for sanction",
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.get("/showLoan", async (req, res) => {
  try {
    const data = await Loan.where({ sanction: true });
    return res.json({
      success: true,
      message: "all the loan applications that are  sanctioned",
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.put("/sanction/:id", async (req, res) => {
  try {
    const LoId = req.params.id;
    const { intrst, emi, roi, lamt, alft, noI } = req.body;
    const lData = await Loan.findById(LoId);
    if (!lData) {
      return res.json({
        success: false,
        message: "Invalid laon Id",
      });
    }
    lData.interest = intrst;
    lData.emi = emi;
    lData.roi = roi;
    lData.loanAmt = lamt;
    lData.amtLeft = alft;
    lData.noofInst = noI;
    lData.sanction = true;

    const saveData = await lData.save();
    return res.json({
      success: true,
      message: "The loan is finally sanctioned",
      saveData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.put("/receipt", async (req, res) => {
  try {
    const { loId, deposit } = req.body;
    const lData = await Loan.findById(loId);
    if (!lData) {
      return res.json({
        success: false,
        message: "Invalid loan Id",
      });
    }
    lData.amtLeft -= deposit;
    const saveData = await lData.save();
    return res.json({
      success: true,
      message: "The loan is finally sanctioned",
      saveData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.put("/adjust", async (req, res) => {
  try {
    const { loId, deposit, intrst } = req.body;
    const lData = await Loan.findById(loId);
    if (!lData) {
      return res.json({
        success: false,
        message: "Invalid loan Id",
      });
    }
    lData.amtLeft -= deposit;
    lData.interest = intrst;
    const saveData = await lData.save();
    return res.json({
      success: true,
      message: "The loan is finally sanctioned",
      saveData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

router.post("/close/:id", async (req, res) => {
  try {
    const LoId = req.params.id;
    const lData = await Loan.findById(LoId);
    if (!lData) {
      return res.json({
        success: false,
        message: "Invalid laon Id",
      });
    }

    if (lData.amtLeft == 0) lData.active = false;

    const saveData = await lData.save();
    return res.json({
      success: true,
      message: "The loan is finally sanctioned",
      saveData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "some internal error has occured",
      error,
    });
  }
});

module.exports = router;
