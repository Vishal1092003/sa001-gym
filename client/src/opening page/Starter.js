import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Logincontext } from '../context/Logincontext';
import { useContext } from 'react';
function Starter() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { userlogin,gohome} = useContext(Logincontext);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  
  console.log("gohome is ",gohome);
  console.log(userlogin)

  if (userlogin) {
    return <Login />;
  } else {
    return <Signup />;
  }
}

export default Starter;
