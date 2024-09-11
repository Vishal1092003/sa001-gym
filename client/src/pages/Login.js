import React, { useContext, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom'
import { Logincontext } from '../context/Logincontext'
import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function Login() {
  
  
  

 const { user,loginWithRedirect ,isAuthenticated,logout,loginWithPopup} = useAuth0();
  
    const navigate=useNavigate();
   const [gmail,setGmail]=useState("")
   const [password,setPassword]=useState("")
  const {setGohome}=useContext(Logincontext)
  const checklogin=()=>{

       const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const passRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

       if(!emailRegex.test(gmail)){
         toast.error("ENTER CORRECT FORMAT OF GMAIL !! ");
       }
      



    fetch('http://localhost:5000/signin',{
        method:"post",
        headers:{
           "Content-Type":"application/json"
        },
        body:JSON.stringify({
            gmail:gmail,
            password:password
        })
    })
    .then(res=>res.json())
    .then((data)=>{
        if(data.error){
          toast.error( data.error)
            console.log("data is ",data.error);
        }else{
          toast.success("Logged In Successfully !!")
         console.log("data is ",data.token);
         console.log("id is ",data._id)
         localStorage.setItem("jwt",data.token)
         localStorage.setItem("_id",data._id)
         console.log("Navigating to /home");
         setGohome(true);
            navigate("/")
        }
    })
    .catch(error=>{
          toast.error("Enter the correct password");
      console.log(error);
    })
  }
  return (
        

    <div className='flex flex-col justify-center items-center  mt-20 p-5'>
       <div className='p-5'>
      <input
            className='font-serif text-rose-400 border border-red-500 rounded-md '

        type='text'
        placeholder='Enter Gmail'
        name='gmail'
        id='input-gmail'
        onChange={(e)=>{
            setGmail(e.target.value);
        }}
      />
    </div>

    <div>
      <input
            className='font-serif text-rose-400 border border-red-500 rounded-md '

        type='password'
        placeholder='Enter PassWord'
        name='password'
        id='input-password'
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
      />
    </div>
    <div className='p-5'>
    <button
    className='font-bold text-xl bg-red-400 rounded-md p-2 '
    onClick={()=>{
        checklogin();
    }}
    >
        Log In
    </button>
    </div>
    <div>

      already registered 
      <button
    
      onClick={()=>{
        navigate("/signup")
      }}
      >
            <span className='font-bold text-xl text-blue-700'>
      
        sign up
      </span>
      </button>
     
    </div>

    <div>

      <button className='text-2xl font-bold text-red-800 bg-slate-400'
      onClick={()=>{
        loginWithRedirect()
      }}
       >
        login with redirect 
      </button>
    </div>
    </div>
    
  )
}

export default Login
