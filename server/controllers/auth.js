const User = require("../models/user");
const Donation=require("../models/donation");

exports.createOrUpdateUser = async (req, res) => {
  const {  picture, email } = req.user;
  const {name,pin,address,mobile,id,role,status,img}=req.body;
  

  const user = await User.findOneAndUpdate(
    { email },
    {  name:name,
        pin:pin,
        mobile:mobile,
        role:role,
        address:address,
        status:status,
        img:img,
       
        id:id },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name:name,
      pin:pin,
      mobile:mobile,
      
      address:address,
      role:role,
      status:status,
      img:img,
      id:id,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.login=async(req,res)=>{
  const {email} =req.user;

  const user=await User.findOne({email});
  res.json(user);
}
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};