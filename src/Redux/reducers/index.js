//root reducers 

import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";


const AllReducers = combineReducers({
    loginReducer:loginReducer
})

export default AllReducers;
