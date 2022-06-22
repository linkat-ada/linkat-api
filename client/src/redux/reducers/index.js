import { combineReducers } from "redux";
import taskReducer from "./taskReducer";

const allReducers = combineReducers({
    task: taskReducer
})

export default allReducers