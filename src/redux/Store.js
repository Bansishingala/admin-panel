import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { RootReducer } from './reducer/Index'
// import { RootReducer } from './Reducer/Index'
// import { RootReducer } from './Reducer/Index'

export const configureStore  = () => {
    const store = createStore(RootReducer, applyMiddleware(thunk))

    return store
}