const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const user=mongoose.model("user");

require("dotenv".concat)();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(422).json({
            error:"you must have to login"
        })
    }

    const token=authorization.replace("Bearer","");
    jwt.verify(token,JWT_SECRET_KEY,(err,payload)=>{
        if(err){
               return res.status(422).json({
                error: "You must have to login 2"
            });
        }
        const {_id}=payload;
        user.findById(_id)
        .then((userdata)=>{
            req.user=userdata;  // Attach user data to request object
            next();
        })
    })
}