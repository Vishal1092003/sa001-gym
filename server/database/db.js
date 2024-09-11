const mongoose=require('mongoose');



require('dotenv').config();
const URI=process.env.URI;
function dbconnect(){
    mongoose.connect(URI,{})
    .then(()=>{
        console.log("db connected successfully");
    })
    .catch((error)=>{
        console.log("error in db connection");
        console.log("error is ",error);
        process.exit(1);
    });
}
module.exports=dbconnect;