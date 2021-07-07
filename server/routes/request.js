

const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");


const {donation,helpreq, donatersForReq, requestersForDon} = require("../controllers/request");

//routes


//for donation request
router.post("/donation", authCheck, donation);
//for help request
router.post("/help", authCheck, helpreq);
//list of donaters as per req
router.get("/donaterForReq",authCheck,donatersForReq);
//list of requester as per donater
router.get("/requesterForDon",authCheck,requestersForDon);


module.exports= router;