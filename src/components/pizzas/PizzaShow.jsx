// PizzaShow is our details page. The show page for a single pizza
// this is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app.
// eventually, this is where we will give our pizzas live
// this is where we will be able to update and delete them
// this will be rendered by it's own route -> pizzas/<id>
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePizza, removePizza, updatePizza } from '../../api/pizza'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPizzaModal from './EditPizzaModal'
import SideShow from '../sides/SideShow'
import NewSideModal from '../sides/NewSideModal'

// sets a style object for our side card container
const sideCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const PizzaShow = (props) => {
    const { pizzaId } = useParams()
    const { user, msgAlert } = props

    const [pizza, setPizza] = useState(null)
    // this determines if the editPizzaModal is open or not
    const [editModalShow, setEditModalShow] = useState(false)
    const [sideModalShow, setSideModalShow] = useState(false)

    // this is a boolean, that we can switch between to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    // this gives us a function we can use to navigate via react-router
    const navigate = useNavigate()

    useEffect(() => {
        getOnePizza(pizzaId)
            .then(res => setPizza(res.data.pizza))
            .catch(err => {
                msgAlert({
                    heading: 'Achtung!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])
    
    // this is an api call function, which means we'll need to handle the promise chain.
    // this means sending appropriate messages, as well as navigating upon success
    const setPizzaFree = () => {
        // we want to remove the pizza
        removePizza(user, pizza._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePizzaSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    // this is going to map over the pizzas's sides array, and produce cards for every side
    let sideCards
    // if we have a pizza, and if their sides array length > 0, make cards, otherwise dont
    if (pizza) {
        if (pizza.sides.length > 0) {
            sideCards = pizza.sides.map(side => (
                <SideShow 
                    key={side.id}
                    side={side}
                    pizza={pizza}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        } else {
            sideCards = <p>The pizza does not have any sides yet</p>
        }
    }

    // if we don't have a pizza, show the loading screen
    if (!pizza) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>
                        { pizza.fullTitle }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Name: {pizza.name}</small><br/>
                            <small>Ingredients: {pizza.baseIngredients}</small><br/>
                            <small>
                                Available {pizza.available ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className='m-2'
                            variant='info'
                            onClick={() => setSideModalShow(true)}
                        >
                            Give {pizza.name} a side!
                        </Button>
                        {
                            pizza.owner && user && pizza.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Pizza
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => setPizzaFree()}
                                >
                                    Set Pizza Free
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            pizza.owner ? `owner: ${pizza.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='m-2' style={sideCardContainerLayout}>
                {sideCards}
            </Container>
            <EditPizzaModal 
                user={user}
                show={editModalShow}
                updatePizza={updatePizza}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                pizza={pizza}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            <NewSideModal 
                pizza={pizza}
                show={sideModalShow}
                msgAlert={msgAlert}
                handleClose={() => setSideModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default PizzaShow