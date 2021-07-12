const User = require("../models/user");
const Donation = require("../models/donation");
const Request = require("../models/request");


//list of all donaters for admin
    exports.listDonatersall=async(req,res)=>{
        let donaters= await Donation.find({})
        .populate("info")
        .sort([["createdAt","desc"]])
        .exec();
        res.json(donaters);
    }
  // list of all requester  
    exports.listRequesterall=async(req,res)=>{
        let requesters= await Request.find({})
        .populate("info")
        .sort([["createdAt","desc"]])
        .exec();
        res.json(requesters);
    }
//list of all unverified user
    exports.unverified=async(req,res)=>{
        let u= await User.find({verified:"false"}).exec();
        res.json(u);
    }
//for verification
    exports.verification=async(req,res)=>{
        let user= await User.findOneAndUpdate({email:req.body.email},{verified:"true"}).exec();
        res.json({ok:true});

    }