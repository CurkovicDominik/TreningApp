import React from "react";
import ReactDOM from 'react-dom/client';

import "./Exercise.css";
import { BiCheckbox } from "react-icons/bi";


let exercisesList = [
    {
        name:"BENCH PRESS",
        equipment:"Barbell",
        hits:{
            chest:"30%",
            triceps:"20%"
        },
        desc:"Bench is good exercise to do"
    },
    {
        name:"INCLINE BENCH PRESS",
        equipment:"Barbell",
        hits:{
            chest:"30%",
            triceps:"40%"
        },
        desc:"Incline is good exercise to do"
    },
    {
        name:"DIPS",
        equipment:"Dip station",
        hits:{
            chest:"30%",
            triceps:"50%"
        },
        desc:"Bench is good exercise to do"
    }
]
let selLis=[];


 class Exercise extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {
            classes:"one-exercise",
            selected:false,
            exerNumber:this.props.exNumber
        }

        this.toggleSelected = this.toggleSelected.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClass = this.handleClass.bind(this);
    }


    handleClass()
    {

        this.setState(state=>
            {
                if(this.state.classes=="one-exercise")
                    {
                       return {classes:"one-exercise one-exercise-clicked"}
                    }
                else
                {
                    return{ classes:"one-exercise"}
                }
                
            });
    }

    toggleSelected()
    {
        /*console.log(this.state.selected);*/
       this.setState(state=>
        {
            if(state.selected==false)
                {
                    
                    return{selected:true}
                }
            else
            {
                return{selected:false}
            }
        },()=>this.props.isSelected(this.state.exerNumber,this.state.selected));
    }

    handleClick()
    {
        this.toggleSelected();
        this.handleClass();
    }

    render()
    {
        return(
            <div id="overDiv" className={this.state.classes} onClick={this.handleClick}>
                <h1>{exercisesList[this.props.exNumber].name}</h1>
                <h2>{exercisesList[this.props.exNumber].equipment}</h2>
                <p>{exercisesList[this.props.exNumber].desc}</p>
            </div>
        );
    }
}


class ExerciseModal extends React.Component
{
    constructor(props)

    {
        super(props);
        this.state=
        {
            selectedEx:[]
        }
        this.checkForSelected = this.checkForSelected.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

    }
    handleAdd()
    {
        
        this.props.klikoAdd(this.state.selectedEx);
        //selLis=this.state.selectedEx;
        //console.log(selLis);
    }

    checkForSelected(exerNum,value)
    {
       
        this.setState(oldStateArray=>
            {

                if(value)
                    {
                       return{ selectedEx:[...oldStateArray.selectedEx,exerNum]}
                    }
                else
                {
                    return{selectedEx:oldStateArray.selectedEx.filter(num => num!== exerNum)}
                }
            }/*,()=>{console.log(this.state.selectedEx)}*/);
        
    }

    render()
    {
        return(
            <div className="ex-modal">
                <h3>Exercises</h3>
                <button className="but" onClick={this.handleAdd}>Add</button>
                <div id="exContainer" className="ex-container">
                    <Exercise isSelected={this.checkForSelected} exNumber={0}/>
                    <Exercise isSelected={this.checkForSelected} exNumber={1}/>
                    <Exercise isSelected={this.checkForSelected} exNumber={2}/>
                </div>
            </div>
        );
    }
}



export class SelectedExercisesList extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state=
        {
            
            sets:0,
            reps:0,
           selectKlas:"checker-za-dann"
        }
        
        this.updateSets = this.updateSets.bind(this);
        this.updateReps = this.updateReps.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }
    
    updateSets(exNum,e)
    {
        const value = parseInt(e.target.value);
        this.props.setListuZaReps((prevLista)=>({
            ...prevLista,
            [this.props.kojiJeDan]:prevLista[this.props.kojiJeDan].map((item,index)=>
                index===exNum ? {...item,sets:value} : item
            )
        }))
    }
    updateReps(exNum,e)
    {
        const value = parseInt(e.target.value);
        this.props.setListuZaReps((prevLista)=>({
            ...prevLista,
            [this.props.kojiJeDan]:prevLista[this.props.kojiJeDan].map((item,index)=>
                index===exNum ? {...item,reps:value} : item
            )
        }))
    }

    //MAybe fix this
    updateStatus(exNum)
    {
        this.setState((prevStatee)=>{
            const currentStatus = this.props.listaZaReps[this.props.kojiJeDan][exNum].done;
            const newStatus = !currentStatus;

            const updatedList = 
            {
                ...this.props.listaZaReps,
                [this.props.kojiJeDan]:this.props.listaZaReps[this.props.kojiJeDan].map((item,index)=>
                    //{return}
                        index===exNum ? {...item,done:newStatus} : item
                    )
            };
        
            const newClass= newStatus ? "checker-za-dann one-exercise-clicked" : "checker-za-dann";

            this.props.setListuZaReps(updatedList);
                            return{
                                selectKlas:newClass
                            }
                        });      
    }


    render()
    {

       
    
        console.log(this.props.kojiJeDan);
        
        const items = this.props.novaListaUex[this.props.kojiJeDan].map((exNum,ind)=>
            
                <li key={ind} className="ex-za-dan">
                    <button className={ "checker-za-dann"}   onClick={(()=>this.updateStatus(ind))}><BiCheckbox style={this.props.listaZaReps[this.props.kojiJeDan][ind].done===true ? {backgroundColor:"rgb(206, 201, 235)"} : {backgroundColor:""}} className={"checker-za-dann"} /></button>
                   <div className="vjezba-za-dan">{exercisesList[exNum].name}</div>
                   <div className="eq-za-dan">{exercisesList[exNum].equipment}</div>
                   <div className="sets-za-dan"><input className="setss-za-dan" onChange={((e) => this.updateSets(ind, e))}  value={this.props.listaZaReps[this.props.kojiJeDan][ind].sets} type="number"/></div>
                   <div className="reps-za-dan"><input className="setss-za-dan" onChange={((e) => this.updateReps(ind, e))}  value={this.props.listaZaReps[this.props.kojiJeDan][ind].reps} type="number"/></div>
                   <div className="weight-za-dan"><input className="setss-za-dan" type="number"/>kg</div>
                  
                </li>
                
                
            );

        return(
        <ul className="ex-list">
           
            {
                items
            }
        </ul>);
    }
}


export default ExerciseModal;

