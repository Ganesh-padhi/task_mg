import React from 'react'
import './Backdrop.css';
const Backdrop =(props)=>{
    return(
        props.show ? <div className="Backdrop" style={{overflow:'hidden'}} onClick={props.Clicked}></div>:null
    )
}
export default Backdrop