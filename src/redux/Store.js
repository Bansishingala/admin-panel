import { createStore } from 'redux'
import { rootCounter } from './Reducer/Index'

export const conFigure = () => {
    let store = createStore(rootCounter)
    return store
}