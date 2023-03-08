const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/gettingUser");

// router 2 : creating regeistor
let success2 = false
router.post(
  "/register",
  body("name").exists(), //check
  body("email").isEmail().withMessage({ error: "enter a valid email" }),
  body("password")
    .isLength({ min: 5 })
    .withMessage({ error: "enter atleast 5 charachters" }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
return res.status(400).json({ success:success2,errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      const user = await new User({
        name,
        email,
        password,
      });
      const token = await user.genrateToken()
      success2 = true
      res.json({success:success2,user:user , token:token})
      user.save();
    } catch (error) {
      res.status(400).json({ success:success2,errors: errors.array() });
    }
  }
);

//route 2 :creating login
let  success = false 
router.post(
  "/login",
  //validation in body object
  body("email").isEmail().withMessage({ error: "enter a valid email" }),
  body("password")
    .isLength({ min: 5 })
    .withMessage({ error: "enter atleast 5 charachters" }),
  async (req, res) => {
    //checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //login form
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email: email });
      if (!userData) {
        return res.status(401).json({success:success, errorData: "unauthorize user" });
      }
      const compare = await bcrypt.compare(password,userData.password)
      if(compare){
        //getting token
        const token = await userData.genrateToken()
        success = true
        res.json({success:success, log:"successfully logged in",jsontoken:token})
      }
    } catch (error) {
      res.status(401).json({success:success, errorData: "unauthorize user" });
    }
  }
);
//decoding jwt and getting data of user
router.post("/getuser",fetchUser,async(req,res)=>{
try {
 const  id = req.id
  const data = await User.findById(id)
  res.send(data)
} catch (error) {
  res.status(404).json({error:error})
}
})
module.exports = router;
