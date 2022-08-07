import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.reducer";
import { MedicinesReducer } from "./Medicine.reducer";


export const RootReducer = combineReducers({
    counter : CounterReducer ,
    Medicine : MedicinesReducer
})