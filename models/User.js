const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
//jwt token genrating
userSchema.methods.genrateToken = async function () {
  try {
    const token = jwt.sign(
     await { _id: this._id },//payload means sending specific data to be converted to json web token
      "jasveersinghisagoodboy"
    );
    return token;
  } catch (error) {
    console.log("some error occured " + error);
  }
};

//password hasing
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
module.exports = mongoose.model("User", userSchema);
