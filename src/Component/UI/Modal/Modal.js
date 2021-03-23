import propTypes from 'prop-types'
import React from 'react'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    return (
        <div style={{padding:'5px'}}>
            <Backdrop show={props.show} Clicked={props.closemodal} />
            <div className="modal-content" style={{
                position: 'fixed', zIndex: '999', left:'12%',
                top: '5%',width:'80%',transition:'all 0.3s ease-out'
            }} >
                <div className="modal-header card-header" >
                    <h5 className="modal-title" id="scrollmodalLabel">{props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" onClick={props.closemodal} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{height:'450px',overflow:'auto'}} >
                    {props.children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={props.closemodal} data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={props.Submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Modal