import * as ActionsTypes from '../ActionTypes'

export const MedicineAction = (dispatch) => () => {
    try {
        fetch('http://localhost:3004/Medicines')
            .then((response) => response.json())
            .then((data) => dispatch ({type:ActionsTypes.GET_MEDICINES , payload:data}));

    } catch (e) {

    }
}