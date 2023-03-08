const jwt = require("jsonwebtoken")
const fetchUser =async (req,res,next)=>{
const token = req.header("auth-token")
if(!token){
    res.status(404).json({error:"plesae enter a valid token"})
}
try {
    const data = await jwt.verify(token,"jasveersinghisagoodboy")
    req.id = data._id
    next()
} catch (error) {
    res.status(404).json({error:error})
}
}
module.exports = fetchUser
