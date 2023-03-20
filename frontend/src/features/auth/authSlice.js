
// thunk funtions and asynchronous function to update our states
// by what we get back from the server
// redux toolkit make that process easier
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


// import authService

import authService from './authService'

// when we register or login we get jwt, and we save it in localStorage,
// get user from localStorage (it can only have string)
// so we need to parse the json
const user = JSON.parse(localStorage.getItem('user'))

// an object that pertains user or auth part of the state
const initialState = {
    user : user ? user : null, // if user exists
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}


// Register user
// async thunk fnc -> fnc that deals with async data with our backend
// also going to have service, for actual http request -> create auth/authService.js 
// we are going to use axios -> frontend/ npm i axios react-toastify


// register and reset functions to be imported in Register.jsx

// takes a string with an action
export const register = createAsyncThunk('auth/register', async(user,thunkAPI) => {
    try { // make a request
        // import auth service from features/auth/authService.js
        return await authService.register(user)
        
    } catch (error) {

        const message = (error.response.data && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        
            return thunkAPI.rejectWithValue(message) // error message as payload

        
    }

}) 


export const logout = createAsyncThunk('auth/logout',
async () => {
    await authService.logout() // now go to authService.js and 
                               // and under register we create 
                               // logout functionality  
})



// now create the slice
export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {   // these are not async or thunk functions
        reset : (state) => { // func reset, resets the state to default values
            state.isLoading = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }

    }, 
    // async thunk fnc take arg builder
    extraReducers : (builder) => {   // all the thunk or async funcs will come here, and it is a func
        // account for if everything goes fine, else reject
        // handles 3 things - pending, fulfilled, rejected
        builder
        .addCase(register.pending, (state) => { // this fnc handles if register is pending,
            state.isLoading = true // fetching the data so pending
        })
        .addCase(register.fulfilled, (state,action) => { // when fulfilled we get data back, 
                                                    // get user token back, so also have an
                                                    // action passed in the fnc
            state.isLoading = false // reg is done so success
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state,action) => { //handles if anything goes wrong
            state.isLoading = false
            state.isError = true // as reg is unsuccessful
            state.message = action.payload // this will come from thunkAPI.rejectWithValue(message)
            state.user = null // as reg unsuccessful so user will have no info

        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })     

    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer

// now go to store.js and import it

 