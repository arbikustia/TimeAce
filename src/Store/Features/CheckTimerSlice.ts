import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface status {
    isDone : boolean
}

const initialState: status = {
    isDone : true
}

export const statusSlice = createSlice({
    name : "statusPlay",
    initialState,
    reducers : {
        checkTime(state, action: PayloadAction<boolean>){
            state.isDone = action.payload    
            console.log('err',state.isDone)
            localStorage.setItem("timeStatus", JSON.stringify(action.payload));
        }
    }
})

export const {checkTime} =statusSlice.actions