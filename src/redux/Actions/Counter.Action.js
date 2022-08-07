import * as ActionsTypes from '../ActionTypes'

export const Increment = () => (dispatch) => {
    dispatch({type : ActionsTypes.INCREMENT_COUNTER})
}
export const Decrement = () => (dispatch) => {
    dispatch({type : ActionsTypes.DECREMENT_COUNTER})
}