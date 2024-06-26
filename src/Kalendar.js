import './Kalendar.css';
import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';

class Gumb extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            day:props.dan,
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDrugiClick = this.handleDrugiClick.bind(this);
    }
    handleClick(event)
    {
        const buttonRect=event.target.getBoundingClientRect();
       this.props.staviPoziciju(
        {
            top:buttonRect.top + window.scrollY + buttonRect.height,
            left:buttonRect.left +window.screenX
        })
        this.props.onPlick(this.state.day);
        console.log("cocoocococ",this.props.novaLista[this.props.dan]);
    }
    handleDrugiClick()
    
    {
        this.props.onSick(this.state.day);
    }
    render()
    
    {
        return(
            <>
            <button className="buttonAdd" style={this.props.novaLista[this.props.dan].length==0 ? {fontSize:"80px"}:{fontSize:"20px",padding:"20px"} } onClick={this.handleClick}>{this.props.novaLista[this.props.dan].length==0 ?"+": this.props.novaLista[this.props.dan].length>0 && this.props.opisi[this.props.dan]==""? "Nema opisa" : this.props.opisi[this.props.dan]}</button>
            <br/>
           {this.props.novaLista[this.props.dan].length!=0 && <button className="buttonClear" onClick={this.handleDrugiClick}>Clear</button>}
            </>
        );
    }
}




function Kalendar({setIsRender,postaviPoziciju,opisi,novaLista,mici})
{

    

    let sadRedner = true;
    
   
    const handleClick=(dan)=>
    {
        setIsRender(sadRedner,dan)
        if(sadRedner==true)
            {
                sadRedner=false;
            }else
            {
                sadRedner=true;
            }
    }


    return (
        <div className="desktop">
            <div className="desktop">
                <div className="kalendar">

                    <div className="kartica">
                        <div className="kartica-header">Monday</div>
                        <div className="kartica-body">

                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Mon" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Tuesday</div>
                        <div className="kartica-body">
                           
                            <div className='button-wrapper'>
                                <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Tue" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Wednesday</div>
                        <div className="kartica-body">
                            
                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Wed" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Thursday</div>
                        <div className="kartica-body">
                           
                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Thu" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Friday</div>
                        <div className="kartica-body">
                           
                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Fri" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Saturday</div>
                        <div className="kartica-body">
                            
                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Sat" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                    <div className="kartica">
                        <div className="kartica-header">Sunday</div>
                        <div className="kartica-body">
                            
                            <div className='button-wrapper'>
                            <Gumb onSick={mici} novaLista={novaLista} opisi={opisi} staviPoziciju={postaviPoziciju} dan="Sun" onPlick={handleClick}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Kalendar;
//FInd position of plus button and put the day modal 