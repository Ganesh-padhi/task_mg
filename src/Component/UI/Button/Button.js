import React from 'react'
import './Button.css'
const Button = (props)=>{
    return(<button onClick={props.Clicked} disabled={props.disabled} className={['Button',props.btnType].join(' ')}>{props.children}</button>)
}



export default Button