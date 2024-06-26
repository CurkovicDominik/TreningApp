import React from 'react';
import ReactDOM from 'react-dom/client';
import './DayModal.css';
import {SelectedExercisesList} from './ExerciseModal';
import ExerciseModal from './ExerciseModal';
import { auth,database } from './firebase';
import {onValue, push,ref,set,child,getDocs} from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

class DayModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {
            shoudRender:false,
            isPlus:false,
            isAdd:false,
            day:this.props.dan,
            opis:"",
            imaLiOpis:false,
            selectedExercises:[],
            selBelEx:[],
            currentDay:this.props.dan,
            position:this.props.modalPosition,
            userL:""
        }
        this.handlePlus = this.handlePlus.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    
        this.handleExercises=this.handleExercises.bind(this);
        this.postavi=this.postavi.bind(this);

        this.handleClickZaOpis=this.handleClickZaOpis.bind(this);
        this.handleOpis=this.handleOpis.bind(this);
    }
  


    handleExercises(newExercises)
    {
        this.setState(prevState => (
            {selectedExercises:[...newExercises],
                selBelEx:[...prevState.selBelEx,...newExercises]
            }),()=>
            {
                this.postavi();
              
            });
        console.log("sel ex:",this.state.selectedExercises);
    }


    postavi()
        {
            let taLista = this.props.novaListaUdan;
            let tajDan=this.props.dan;
            this.props.postaviListu(prevLista=>
                ({
                    ...prevLista,
                    [this.props.dan]:[...prevLista[this.props.dan] /*|| [])*/ ,...this.state.selectedExercises]
  
                }));

                const userRef = ref(database,`users/${this.props.userL}/${this.props.dan}`);
                onValue(userRef,(snapshot)=>
                    {
                        let existingData = [];
                        if(snapshot.exists())
                            {
                                existingData = snapshot.val();
                            }
                        const newData=[...existingData,...this.state.selectedExercises];
                        set(userRef,newData/*this.state.selBelEx*/);
                    },{onlyOnce:true});
                    

            
                    const stvarii = this.state.selectedExercises.map((elem)=>(
                        {
                            
                                sets:0,
                                reps:0,
                                weight:0,
                                done:false
                            
                        }));

                    this.props.setListuZaReps((prevState)=>
                        ({
                            ...prevState,
                        [this.props.dan]:[...prevState[this.props.dan],...stvarii]
                    })
                    );
        }


    handleAdd(newExercises)
    {
        
        this.handleExercises(newExercises);
        //this.postavi();
        this.setState(state=>
            
            {
                
                if(!state.isAdd)
                    {
                return{isAdd:true,isPlus:false}
                }
                else
                {
                    return{isAdd:false,isPlus:false}
                }
            });
            
    }
   
    handlePlus()
    {
        console.log("nova lista u ex ide ovak:  ",this.props.novaListaUdan)

        this.setState((state)=>
            {
                if(state.isPlus)
                    {
                        return{isPlus:false};
                    }
                else
                {
                    return{isPlus:true}
                }
            });
    }

    handleOpis(e)
    {
        this.setState({opis:e.target.value})
        
        
    }

    handleClickZaOpis()
    {
        this.setState({imaLiOpis:true});
        this.props.setOpise((prevState)=>(
            {
                ...prevState,
                [this.props.dan]:this.state.opis
            }))
        console.log(this.props.opisi);
    }
    
    render()
    {
        let imaLiOpis = this.state.imaLiOpis;
        if(this.props.opisi[this.props.dan]!="")
            {
                imaLiOpis =true;
            }
        return(
            <div >
                {this.state.isPlus && <ExerciseModal klikoAdd={this.handleAdd}/>}
        <div className='day-modal' style={{position:"absolute",top:this.state.position.top-200,left:this.state.position.left-180}}>
            <button className='eks' onClick={this.props.klikniEks}>X</button>
            <h2 className='naslov'>{this.state.day}</h2>
            <h3 className='opis'>{!imaLiOpis && <input type='text' value={this.state.opis} onChange={(e)=>this.handleOpis(e)}/>}{imaLiOpis && this.props.opisi[this.state.day]}{!imaLiOpis && <button className='adss' onClick={this.handleClickZaOpis}>Dodaj opis</button>}</h3>
            <div className='exercise-titles'>
                <div className='title-header'></div>
                <div className='title-header'>EXERCISE</div>
                <div className='title-header'>EQUIPMENT</div>
                <div className='title-header'>SETS</div>
                <div className='title-header'>REPS</div>
                <div className='title-header'>WEIGHT</div>
            </div>
            <div className='card-contaainer'>
                 
                 <SelectedExercisesList listaZaReps={this.props.listaZaReps} setListuZaReps={this.props.setListuZaReps} novaListaUex={this.props.novaListaUdan} selectedExercises={this.state.selectedExercises} kojiJeDan={this.state.day}/>
                 <button className='ads' onClick={this.handlePlus}>+</button>
             </div>
        </div></div>
        );
    }
}

export default DayModal;