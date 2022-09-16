const validator = require("validator");
const mongoose = require("mongoose");
const User = mongoose.model("User", {
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invalid email format");
    },
  },
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
  age: {
    type: Number,
    min: 21,
    max: 60,
    default: 21,
    validate(value) {
      if (!value) this.age = 21;
    },
  },
  activeStatus: {
    type: String,
    trim: true,
    toLowerCase: true,
    enum: ["", "on"],
    default: "",
  },
  addresses: [
    {
        addressType:{
            type:String, trim:true, required:true
        },
        addressDetail:{
            type:String, trim:true, required:true
        }
    }
]
});
module.exports = User;
