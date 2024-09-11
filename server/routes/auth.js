const express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt")
const mongoose=require('mongoose');

const user=mongoose.model('user');

const jwt=require("jsonwebtoken")

require("dotenv").config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

router.post('/signup',(req,res)=>{

    const{name,gmail,password}=req.body;

    if(!name || !gmail || !password){
        res.status(422).json({
            error:"please enter all the fields"
        })
    }
    user.findOne({$or:[{gmail:gmail},{name:name}]}).then((saveduser)=>{

        if(saveduser){
            return res.status(422).json({
                error:"user already exist with the same username and password"
            })
        }else{
            bcrypt.hash(password,12).then((hashedpassword)=>{
                const newuser=new user({
                    name,
                    password:hashedpassword,
                    gmail
                })
                      newuser.save()
        .then(user=>{
            res.status(400).json({
                data:user,
                message:"registered successfully"
            })
            
            
        })
        .catch((error)=>{
            console.log("error while sign up ",error);
        })



            })

      
        }
        

    })
})



router.post("/signin",(req,res)=>{
    const {gmail,password}=req.body;
    console.log("gmail is ",gmail);
    console.log("password is ",password);

    if(!gmail || !password){
      return  res.status(422).json({
            error:"please give all details"
        })
    }


    user.findOne({gmail:gmail})
    .then((savedUser)=>{
        if(!savedUser){
           return res.status(422).json({
            error:"user not exist"
           })
        }

             console.log("saved user is ",savedUser);
             bcrypt.compare(password,savedUser.password)
             .then((match)=>{
                 if(!match){
                    return res.status(422).json({
                        error:"password not matches"
                    })
                 }
                const token=jwt.sign({_id:savedUser},JWT_SECRET_KEY);
                const{_id}=savedUser;
               
                console.log("token is ",token);
                return  res.status(200).json({
                    message:"password matched successfully",
                     token,_id
                })
             })
           
             .catch((error)=>{
               return res.status(422).json({
                    error:"error in password matching "
                })
                console.log("error in password matching ",error);
             })
        
    })
    .catch((error)=>{
        res.status(422).json({
            error:"internal server error "
        })
    })

})


module.exports=router;