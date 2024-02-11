import PizzasIndex from './pizzas/PizzasIndex'

const Home = (props) => {
	const { msgAlert } = props
	
	return (
		<>
			<h2>Home Page</h2>
			
			<PizzasIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home