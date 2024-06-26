import logo from './logo.svg';
import './App.css';
import Kalendar from './Kalendar';
import jeli from './Kalendar';
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import DayModal from './DayModal';
import ExerciseModal from './ExerciseModal';
import { onAuthStateChanged } from "firebase/auth";
import { auth,database } from './firebase';
import {onValue, push,ref,set,child,getDocs,remove} from "firebase/database";
import firebase from 'firebase/compat/app';


function App() {

  const [userL,setUserL]=useState();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
     
          const uid = user.uid;
          setUserL(uid);
          console.log("uid", user.email)
        } else {
       
          console.log("user is logged out")
        }
      });
     
}, []);

  const [opisi,setOpise] = useState({"Mon":"","Tue":"","Wed":"","Thu":"","Fri":"","Sat":"","Sun":""})

  const [listaPomocBaze,setListaPomocBaze] = useState({"Mon":[],"Tue":[],"Wed":[],"Thu":[],"Fri":[],"Sat":[],"Sun":[]});

  const [novaLista,setNovaLista] = useState({"Mon":[],"Tue":[],"Wed":[],"Thu":[],"Fri":[],"Sat":[],"Sun":[]});

  const [listaZaSetsReps,setLista] = useState({
   "Mon":[],"Tue":[],"Wed":[],"Thu":[],"Fri":[],"Sat":[],"Sun":[]});

 
 const [isRender,setRender]=useState(false);
 const [trenutniDan,setTrenutniDan]=useState("");
 const [pozicija,setPozicija]=useState("");
 
 function RenderDay(value,day)
 {
  setTrenutniDan(day);
  setRender(value);
 }
 function handleGumbic()
 {
 
  console.log("ovo je lista sa repovima:", listaZaSetsReps)
  setRender(false);
 }

useEffect(()=>
  {
    if(userL)
      {
      const userRef = ref(database,`users/${userL}`);
      onValue(userRef,(snapshot)=>
        {
          if(snapshot.exists())
            {
              const itemKeys = Object.keys(snapshot.val());
              const itemValues = Object.values(snapshot.val());
             console.log("user exist:",snapshot.val())
             const userData = snapshot.val();
                
                setNovaLista(prevLista=>(
                  {
                    ...prevLista,
                    ...userData
                  }));
               
              
    
            }else
            {
              console.log("don do not");
              set(child(ref(database,`users`),userL), {"Mon":[1,2],"Tue":[]});
             
            }
        });
      } 
    },[userL])
useEffect(()=>
  {
    if(userL)
      {
      const userRef = ref(database,`users/${userL}`);
      onValue(userRef,(snapshot)=>
        {
          if(snapshot.exists())
            {
              const itemKeys = Object.keys(snapshot.val());
              const itemValues = Object.values(snapshot.val());
            
           
               
    for(let i = 0;i<itemKeys.length;i++)
      {
        let valll = itemValues[i]
        let keyyy = itemKeys[i];
        
        for(let j= 0;j<7;j++)
          {
            if(itemKeys[i] == Object.keys(novaLista)[j])
              {
                let bann = valll[j];
                console.log("evo tu je");
                console.log("OVo vam je vall",valll);
                console.log("Novi test ",novaLista)
                const stvarii=novaLista[keyyy].map((elem)=>(
                  {
                      
                          sets:0,
                          reps:0,
                          weight:0,
                          done:false
                      
                  }));
                setLista(prevLista=>({
                  ...prevLista,
                  [keyyy]:[...prevLista[keyyy],...stvarii]
                }) )  ; 

              }
          }   
        
        }}  })
}},[novaLista])

function remav(gl)
{
  let locat=ref(database,`users/${userL}/${gl}`)
 remove(locat);
  novaLista[gl]=[];
 console.log("hhhh");
}
useEffect(() => {
  console.log(novaLista, '- Has changed');

},[novaLista])
 


  return (
    <div className="App">
     
      {isRender && <DayModal opisi={opisi} setOpise={setOpise} userL={userL} modalPosition={pozicija} klikniEks={handleGumbic} novaListaUdan={novaLista} setListuZaReps={setLista} listaZaReps={listaZaSetsReps} postaviListu={setNovaLista} dan={trenutniDan}/>}
      {isRender && <div className='overlay'></div>}
      <Kalendar opisi={opisi} novaLista={novaLista} postaviPoziciju={setPozicija} setIsRender={RenderDay} mici={remav}/>
    </div> 
  );
}

export default App;
