export * as ActionType from "../ActionType"

const initval = {
    counter :0
}

export const counterRedux =(state = initval , action) => {
    switch (action.type) {
        case action.type.INCREMENT_COUNTER:
        return{
            ...state,
            counter : state.counter +1
        }
        case action.type.DECREMENT_COUNTER:
            return{
                ...state,
                counter : state.counter-1
            }
        default:
            return state;
    }
}