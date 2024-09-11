import React from 'react'

function Utility() {
  
    const token=localStorage.getItem('jwt');
    console.log("token is ",token);
    return token!==null
    

}

export default Utility
