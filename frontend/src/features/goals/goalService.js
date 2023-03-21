import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goal

const createGoal = async(goalData, token) => {
    const config = {  // object of headers
        headers : {  // send as authorization header
            Authorization : `Bearer ${token}` // send token as Bearer token (postman)
        }
    }

    const response = await axios.post(API_URL,goalData,config) // post request + config has header
    // if we do not send this auth token, we can not access this route

    return response.data
}

const goalService = {createGoal}

export default goalService

// import it in goalSlice