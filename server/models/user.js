const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required:true,
      },
    email: {
      type: String,
      required: true,
      index: true,
    },
    // password:{
    // type:String,
    // required:true,
    // },
    role: {
      type: String,
      enum:["admin","donor","requester"]
     
    },
    category:{
     type:String,
    //  enum:["1",'2','3','4'] 
    },
   infoReq:{
     type:ObjectId,
     ref:"Request"
   }
    ,
    infoDon:{
      type:ObjectId,
      ref:"Donation"
    },
      
    mobile:{
      type:Number,
      required:true,
      },
      pin:{
        type:Number,
        required:true,
        },
      address:{
        type:String,
        required:true,
        },
      status:{
          type:String,
          enum:["active","not active"]
      },
      id:{
          type:String,
          required:true,
      },
      verified:{
          type:String,
          default:"false"
      }
      ,
      img:{
          type:Array,
      }
    ,

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);