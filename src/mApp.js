import logo from './logo.svg';
import './App.css';

import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import  {Routes,Route} from 'react-router-dom';
import {Login} from "./login";
import App from "./App";
import {Signup} from "./signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth,database } from './firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';



function Mapp() {
   
  const navigate = useNavigate();
  const [userW,setUserW] = useState("");

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
         
          const uid = user.uid;
         
          setUserW(user.email
          );
          console.log("uid", user.email)
        } else {
        
          setUserW("" );
          console.log("user is logged out")
        }
      });
     
}, []);

const handleLogin=()=>
  {
    navigate("/login");
  }

const handleLogout = () => {               
  signOut(auth).then(() => {

      navigate("/");
      console.log("Signed out successfully")
  }).catch((error) => {

  });
}


  return( <>
  <div className='background'>
  <nav className='nav'>
    <h1>TRENING KALENDAR</h1>
    <div className='rightSide'>
       <h2>Logged in as {userW!=""?userW:"guest"}</h2>
       {userW!=""?<button className='but' onClick={handleLogout}>Logout</button>:<button className='but' onClick={handleLogin}>Login</button>}
    </div>
  </nav>
    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
    </>
    );
}

export default Mapp;
