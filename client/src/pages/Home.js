import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
     const { user, logout, isAuthenticated } = useAuth0();
useEffect(()=>{
  const token=localStorage.getItem("jwt");
  console.log("token in my home ",token);
},[])
   
   
  return (
    <>
        NOW SHIVAM WILL TAKE OVER
    </>
  )
}

export default Home;
