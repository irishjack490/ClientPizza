import apiUrl from '../apiConfig'
import axios from 'axios'

// Create side
// POST	/sides/:pizzaId	
export const createSide = (pizza, newSide) => {
    return axios({
        url: `${apiUrl}/sides/${pizza._id}`,
        method: 'POST',
        data: { side: newSide }
    })
}

// Update side
// PATCH	/sides/:pizzaId/:sideId	
export const updateSide = (user, pizza, updatedSide) => {
    return axios({
        url: `${apiUrl}/pizzas/${pizza._id}/${updatedSide._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { side: updatedSide }
    })
}

// Delete side
// DELETE	/sides/:pizzaId/:sideId	
export const removeSide = (user, pizzaId, sideId) => {
    return axios({
        url: `${apiUrl}/sides/${pizzaId}/${sideId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}