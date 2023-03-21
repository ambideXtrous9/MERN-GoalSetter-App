import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import goalService from './goalService' // now add our extraReducer

// initial state : every redux resource

const initialState = {
    goals: [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ''
}

// Create new Goal
// similar implementation as authSlice

export const createGoal = createAsyncThunk('goals/create',
async(goalData,thunkAPI) => {
    try {
        // reg and login are protected, so we no need to send token again
        // thunkAPI has a getState method to get anything we want in any part of the
        // state including auth, so we'll use that
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData,token)
        
    } catch (error) {
        const message = (error.response.data && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        
            return thunkAPI.rejectWithValue(message) // error message as payload        
    }
})

// create goalSlice by using createSlice
export const goalSlice = createSlice({
    name : 'goal',
    initialState,
    reducers : {
        // by this reset, we want to set goals to an empty array
        // it will have a func, arg is state and set it to initialState
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload) // payload = new goal we just created
            })
            .addCase(createGoal.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload // error message
            })
            // for now we can see our uploaded goals in DB
            // later we design our frontend to show those goals
    }
})

// 

export const {reset} = goalSlice.actions
export default goalSlice.reducer

// now add it to Store.js