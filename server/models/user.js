const mongoose=require('mongoose');

const ProfileUser=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        gmail:{
            type:String,
            required:true
        },
        sex:{
            type:String,
            // required:true
        },
        chest:{
            type:String,
            // required:true
        },
        height:{
            type:String,
            // required:true
        },
        pincode:{
            type:String,
            // required:true
        },
        address:{
            type:String,
            // required:true
        },
        password:{
            type:String,
            require:true
        }

    }
)
mongoose.model("user",ProfileUser);