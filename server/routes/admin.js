

const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");


const {listDonatersall,listRequesterall,verification,unverified} = require("../controllers/admin");

//routes
//all request for admin dashboard

//list of all donors
router.get("/donationall",authCheck,adminCheck,listDonatersall);
//list of all requester
router.get("/requesterall",authCheck,adminCheck,listRequesterall);
//unverified user
router.get("/unverified",authCheck,adminCheck,unverified);
//for verification request
router.post("/verification",authCheck,adminCheck,verification);


module.exports= router;