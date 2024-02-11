// this form will take several props, and will be used by PetCreate as well as PetUpdate
// the action will be dependent upon the parent component(update or create)
// but the form itself, will look the same on both pages
import { Form, Button, Container } from 'react-bootstrap'

const PizzaForm = (props) => {
    // we need several specific props to make this pet form reusable
    // we need the object itself (a pet), a handleChange, and a handleSubmit
    // those functions will be determined by the parent component and passed to the form as a prop.
    // we'll also add a custom heading to the form, that will change depending on the parent
    const { pizza, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is the name for your pizza?"
                        id="name"
                        name="name"
                        value={ pizza.name }
                        onChange={handleChange}
                    />
                
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>What are the base ingredients? </Form.Label>
                    <Form.Control 
                        type="string"
                        placeholder="What are the base ingredients?"
                        value={ pizza.baseIngredients }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Is this pizza available?"
                        name="available"
                        defaultChecked={ pizza.available }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PizzaForm 