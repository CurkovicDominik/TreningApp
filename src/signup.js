import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase';


export  function Signup()
{

    const navigate = useNavigate();
    const [jeli,setJeli] = useState(false);   

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault(); 
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setJeli(true);
            // ..
        });
}


return (
    <main className='forma'>        
        <section>
            <div>
                <div>                  
                    <h1> Enter e-mail and password </h1>                                                                            
                    <form>                                                                                            
                        <div style={{padding:"20px"}}>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <br/>
                            <input
                            className='inputs'
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div style={{padding:"20px"}}>
                            <label htmlFor="password">
                                Password
                            </label>
                            <br/>
                            <input
                             className='inputs'
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>     
                        {jeli && <div style={{color:"red"}}>Please enter valid information</div>  }              
                                        
                      <div style={{padding:"20px"}}> 
                        <button className='but'
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                        </div>                                             
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}