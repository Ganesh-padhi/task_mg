import React from 'react';

import './Input.css';

const input = ( props ) => {
    let inputElement = null;
    let inputClassElement=['InputElement']
    if(props.invalid && props.shouldInvalid && props.touched)
    {
        inputClassElement.push("invalid")
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClassElement.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClassElement.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClassElement.join(" ")}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;