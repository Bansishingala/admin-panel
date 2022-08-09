import { getAllMedicines } from '../../Common/axious/Medicine_api';
import * as ActionsTypes from '../ActionTypes'
import { BASED_URL } from '../../fetch/Base_url';


export const MedicineAction = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/Medicines')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionsTypes.GET_MEDICINES, payload: data }));

    } catch (e) {

    }
}

export const getMedicinces = () => (dispatch) => {
    try {
        dispatch(LoadingMedicinces());

        setTimeout(function () {
            getAllMedicines()
                .then((data) => dispatch({ type: ActionsTypes.GET_VALUE, payload: data.data }))
                .catch((error) => dispatch(errorMedicinces(error.message)))
            // fetch(BASED_URL + 'Medicices')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: ActionType.GET_VALUE, payload: data }))
            //     .catch((error) => dispatch(errorMedicinces(error.message)));
        }, 2000);
    } catch (error) {
        dispatch(errorMedicinces(error.message))
    }
}
export const LoadingMedicinces = () => (dispatch) => {
    dispatch({ type: ActionsTypes.LOADING_MEDICINCES });
}

export const errorMedicinces = (error) => (dispatch) => {
    dispatch({ type: ActionsTypes.ERROR_MEDICINCES, payload: error });
}