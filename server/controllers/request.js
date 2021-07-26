const User = require('../models/user');
const Donation = require('../models/donation');
const Request = require('../models/request');

// new donation request
exports.donation = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  if (user.role === 'donor') {
    let newdonation = await new Donation({
      info: user._id,
      category: req.body.category,
      description: req.body.description,
    })
      .populate('info')
      .save();

    await User.findOneAndUpdate(
      { email: req.user.email },
      { infoDon: newdonation._id }
    ).exec();

    res.json(newdonation);
  } else {
    res.json('you are not a donor');
  }
};
// new help request
exports.helpreq = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  if (user.role === 'requester') {
    let newRequest = await new Request({
      info: user._id,
      category: req.body.category,
      description: req.body.description,
    })
      .populate('info')
      .save();
    await User.findOneAndUpdate(
      { email: req.user.email },
      { infoReq: newRequest._id }
    ).exec();

    res.json(newRequest);
  } else {
    res.json('You are not a requester');
  }
};

// exports.listDonatersall=async(req,res)=>{
//     let donaters= await Donation.find({})
//     .populate("info")
//     .sort([["createdAt","desc"]])
//     .exec();
//     res.json(donaters);
// }

//list of donaters as per request
exports.donatersForReq = async (req, res) => {
  let d = await User.find({
    $and: [
      { role: 'donor' },
      { verified: 'true' },
      { status: 'active' },
      { category: req.body.category },
    ],
  })
    .populate('infoDon')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(d);
};
// exports.donatersForReq=async(req,res)=>{
//     let d= await User.aggregate([{
//         $lookup:{
//             from:"Donation",
//             localField:"_id",
//             foreignField:"info",
//             as:"donaters"
//         }
//     }]);
//     res.json(d);
// }

//list of requester as per donater

exports.requestersForDon = async (req, res) => {
  let d = await User.find({
    $and: [
      { role: 'requester' },
      { verified: 'true' },
      { status: 'active' },
      { category: req.body.category },
    ],
  })
    .populate('infoReq')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(d);
};

// exports.listRequesterall=async(req,res)=>{
//     let requesters= await Request.find({})
//     .populate("info")
//     .sort([["createdAt","desc"]])
//     .exec();
//     res.json(requesters);
// }
