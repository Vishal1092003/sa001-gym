const express=require('express');
const app=express();
const cors=require('cors');
const dbconnect = require('./database/db');
// const cors=require("cors");
// body parser is very important during connection between server and client
app.use(express.json());
app.use(cors());

require('dotenv').config();
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server connected at port numebr ${PORT}`);
})
app.get('/',(req,res)=>{
    res.send("hello");
})

const ProfileUser=require("./models/user.js");
// const auth =require("./routes/auth.js")
// app.use(auth)

const auth=require("./routes/auth.js");
app.use(auth);

dbconnect();




