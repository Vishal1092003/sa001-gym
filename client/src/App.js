import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { Logincontext } from './context/Logincontext';
import Utility from './Utility/Utility';

function App(){
  const [userlogin, setUserlogin] = useState(false);
  const [gohome, setGohome] = useState(false);

  useEffect(() => {
    if (Utility()) {
      setGohome(true);
    }
  }, []);

  console.log("check jwt token ", Utility());
  console.log("gohome is my app ", gohome);

  return (
    <Logincontext.Provider value={{ setUserlogin, userlogin, setGohome }}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={gohome ? <Home /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={gohome ? <Navigate to="/" /> : <Signup/>} />
            <Route path="/login" element={gohome ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </div>
        <ToastContainer/>
      </BrowserRouter>
    </Logincontext.Provider>
  );
}

export default App;
