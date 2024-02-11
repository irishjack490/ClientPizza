// this component is going to take functionality away from Home.js, and focus only on displaying a list of pizzas gathered from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import { getAllPizzas } from "../../api/pizza"
// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// react allows you to create something called a styling object
const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PizzasIndex = (props) => {
    // first we want two pieces of state to use for rendering
    const [pizzas, setPizzas] = useState(null)
    const [error, setError] = useState(false)

    // we'll destructure our props
    const { msgAlert } = props

    // useEffect is an effect hook, and it requires two args
	// the first is a callback function
	// the second arg is a dependency array
	// the dependency array, tells react when to run the effect hook. If we want this to run only on the first render and anytime the page refreshes, we keep the dependency array empty
	// useEffect is called RIGHT after the FIRST render of the component
	useEffect(() => {
		getAllPizzas()
			
			.then(res => {
				console.log('use Effect hook ran')
				setPizzas(res.data.pizzas)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])


    // we need to handle multiple states of our data
    // what if we have an error?
    if (error) {
        return <LoadingScreen />
    }

    // what if we have no data?
    if (!pizzas) {
        return <LoadingScreen />
    // what if the expected array is empty?
    } else if (pizzas.length === 0) {
        return <p>No pizzas yet, go add some!</p>
    }

    // what do we display when our data comes through fine?
    // we want to loop over the array of pizzas
    // and produce one card for each and every pizza we get back from the db
    const pizzaCards = pizzas.map(pizza => (
        <Card key={pizza.id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{pizza.fullTitle}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/izzas/${pizza.id}`} className='btn btn-info'>
                        View {pizza.name}
                    </Link>
                </Card.Text>
                { pizza.owner ?
                    <Card.Footer>owner: {pizza.owner.email}</Card.Footer>
                    :
                    null
                }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { pizzaCards }
        </div>
    )
}


export default PizzasIndex