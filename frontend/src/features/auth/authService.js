// services is strictly for making the http request and sending
// the data back. and setting any data in localStorage
// import axios equivalent of postman

import axios from 'axios'

// API_URL = '/api/users/' gonna look at localhost:3000
// we can put manually put the port 5000 or
// we go to the frontend/package.json and add the proxy - "proxy" : "http://localhost:5000",
// no when we make request, it looks at 'proxy' first then API_URL 
const API_URL = '/api/users/'

//Register user
// user gets passed in the function
const register =  async(userData) => {
    const response = await axios.post(API_URL, userData) // 2nd arg sends the user data
    // when we use axios, it puts the data inside an object called 'data'
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) // localStorage takes string only
    }
    
    return response.data
}

// Logout User and add logout button on Header.jsx
// import logout and reset there
const logout = () => {
    localStorage.removeItem('user')
}

// export this
const authService = {register,}

export default authService