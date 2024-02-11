// this modal is rendered by the PizzaShow component
// the state that controls this modal, whether it's open or not, will live in PizzaShow
// the state, AND the updaterfunction associated with that state is passed here as a prop from PizzaShow

import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import SideForm from '../shared/SideForm'
// if we want custom messages, import those here
import messages from '../shared/AutoDismissAlert/messages'
// we'll need an api call to make this modal work, that'll be imported here
import { createSide } from '../../api/side'

// we'll also need the same props we're passing to the SideForm, if they come from the parent

const NewSideModal = (props) => {
    const { pizza, show, handleClose, msgAlert, triggerRefresh } = props
    // new piece of state, side, initial value is an empty object
    // we will build this object out, using our handleChange function
    const [side, setSide] = useState({})

    const onChange = (e) => {
        e.persist();
        setSide((prevSide) => {
            const updatedName = e.target.name;
            const updatedValue = e.target.value;
    
            const updatedSide = {
                [updatedName]: updatedValue
            };
    
            return {
                ...prevSide,
                ...updatedSide
            };
        });
    };
    

   
    
    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call
        createSide(pizza, side)
            // then close the modal
            .then(() => handleClose())
            // notify our user that it was a success
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createSideSuccess,
                    variant: 'success'
                })
            })
            // refresh the parent page(component)
            .then(() => triggerRefresh())
            .then(() => setSide({}))
            // if error, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SideForm 
                    side={side}
                    value={side.size}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pizza.name} a side!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSideModal