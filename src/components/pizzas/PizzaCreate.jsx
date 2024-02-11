

import { useState } from 'react'
import PizzaForm from '../shared/PizzaForm'
import { useNavigate } from 'react-router-dom'
import { createPizza } from '../../api/pizza'
import messages  from '../shared/AutoDismissAlert/messages'

const PizzaCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    const navigate = useNavigate()
    // build our state object
    const [pizza, setPizza] = useState({
        name: '',
        baseIngredients: '',
        available: true
        
    })

    const onChange = (e) => {
        // e is the placeholder for the event
        // e.persist is bc react uses the virtual dom, we want our form data to persist every time the page renders. Which will be a lot of times.
        e.persist()

    
        setPizza(prevPizza => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above two items work great for strings
            // however, we need to handle numbers and booleans as well
            if (e.target.type === 'number') {
                // if the target is a number, parst integers from the value
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send true and when to send false. Because the default values for a checkbox are 'checked' or 'unchecked', we need to convert those to the appropriate boolean value
            if (updatedName === 'available' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'available' && !e.target.checked) {
                updatedValue = false
            }

            // this will actually buiild our pizza object
            // we grab an attribute name, and assign the respective value
            const updatedPizza = { [updatedName] : updatedValue }

            // to keep all the old stuff, and add newly typed letter/numbers etc
            return {
                ...prevPizza, ...updatedPizza
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createPizza(user, pizza)
            .then(res => { navigate(`/pizzas/${res.data.pizza.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'super!',
                    message: messages.createPizzaSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    console.log('the pizza inside create', pizza)
    return (
        <PizzaForm
            pizza={pizza}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new pizza!"
        />
    )
}

export default PizzaCreate