const mongoose = require("mongoose")
require('dotenv').config()
mongoose.set('strictQuery', true)
const url = process.env.PRIVATE_KEY
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to database successfully");
}).catch((error)=>{
    console.log("some error occurred "+error);
})