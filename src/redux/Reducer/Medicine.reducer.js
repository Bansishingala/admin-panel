import * as ActionsTypes from '../ActionTypes'

const initialval = {
    isLoading :false ,
    medicine :[] ,
    Error :""
}

export const MedicinesReducer = (state = initialval , action ) => {
    switch (action.type) {
        case ActionsTypes.GET_MEDICINES:
        return {
            ...state ,
            isLoading:false ,
            medicine: ActionsTypes.payload,
            Error: ""
            
        }
        default:
            return state 
    }
}