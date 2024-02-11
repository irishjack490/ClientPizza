import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllPizzas = () => {
    return axios(`${apiUrl}/pizzas`)
}

// READ -> Show
export const getOnePizza = (id) => {
    return axios(`${apiUrl}/pizzas/${id}`)
}

// CREATE -> Add a pizza
// API calls with axios that are not a simple GET, require a config object
// that config object needs a url, method, and any auth headers if necessary
export const createPizza = (user, newPizza) => {
    return axios({
        url: `${apiUrl}/pizzas`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pizza: newPizza }
    })
}

// UPDATE -> Adjust a pizza
export const updatePizza = (user, updatedPizza) => {
    return axios({
        url: `${apiUrl}/pizzas/${updatedPizza._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pizza: updatedPizza }
    })
}

// DELETE -> Remove pizza
export const removePizza = (user, id) => {
    return axios({
        url: `${apiUrl}/pizzas/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}