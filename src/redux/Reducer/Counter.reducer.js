import * as ActionsTypes from '../ActionTypes'

const intialval =  {
    count:0
}

export const CounterReducer = (state = intialval , action ) => {
    switch (action.type) {
        case ActionsTypes.INCREMENT_COUNTER:
            return{
                ...state,
                count : state.count + 1
            }
            
            case ActionsTypes.DECREMENT_COUNTER:
            return{
                ...state,
                count : state.count - 1
            }
            
        default:
            return state;
    }
}