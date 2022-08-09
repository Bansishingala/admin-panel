import * as ActionsTypes from '../ActionTypes'

const initialval = {
    isLoading :false ,
    medicine :[] ,
    Error :""
}

export const MedicinesReducer = (state = initialval , action ) => {
    console.log(action.type,action.payload);
    switch (action.type) {
        case ActionsTypes.GET_MEDICINES:
        return {
            ...state ,
            isLoading:false ,
            medicine: action.payload,
            Error: ""
            
        }
        default:
            return state 
    }
}