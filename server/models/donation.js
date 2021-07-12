const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const donationSchema = new mongoose.Schema(
  {
    info: {
      type: ObjectId,
      ref:"User"
    },
    description:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
