import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Logincontext';
import Login from './Login';
function Signup() {

    const [username,setUsername]=useState("");
    const[gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    // console.log("username is ",username);
    const{setGohome}=useContext(Logincontext);
    const navigate=useNavigate();

    const postdata=()=>{
        fetch('http://localhost:5000/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({  
               gmail:gmail,
               name:username,
               password: password
            })
        }).then(res=>res.json())
        .then((data)=>{
            if(data.error){
                console.log("error is ",data.error)
            }else{
                // navigate to signin
               //  setGohome(true);
                navigate("/login")
                console.log("now need to sign")
            }
            console.log("data is ",data);
        })

    }
   
               return (
                
  
      <div>

        <div className='flex flex-col justify-center items-center  mt-20'>

           <h1 className='font-serif text-2xl '>
            ENTER YOUR CREDENTAILS
           </h1>
            
            <div className='mt-10'>
               <input 
            className='font-serif text-rose-400 border border-red-500 rounded-md '

               type='text'
               placeholder='USERNAME'
               id='username'
               name='username'
               onChange={(e)=>{
                setUsername(e.target.value);
               }}
            />
            </div>
            
            <div className='m-1'>
          <input
            className='font-serif text-rose-400 border border-red-500 rounded-md '

               type='text'
               placeholder='GMAIL'
               id='gmail'
               name='gmail'
               onChange={(e)=>{
                setGmail(e.target.value)
               }}
            />
            </div>
             
             <div className='m-1'>
                  <input
            className='font-serif text-rose-400 border border-red-500 rounded-md '

               type='text'
               placeholder='PASSWORD'
               id='password'
               name='password'
               onChange={(e)=>{
                setPassword(e.target.value)
               }}
            />
             </div>

             <div className='m-1'>
                <button className='font-bold text-xl bg-red-400 rounded-md '
                onClick={()=>{
                        postdata()
                }
                  
                
                    
                }
                >
                    SIGN UP
                </button>
                
             </div>
             <div> 
             Already has an account 

                <button
               
               onClick={()=>navigate("/login")}
                >
                   
                   <span className='text-xl font-bold text-blue-600'>
                   sign in
                       
                   </span>
                </button>
             </div>
             
        </div>
    </div>
  )
    
  
}

export default Signup
