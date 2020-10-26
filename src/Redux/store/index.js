//redux store

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import AllReducers from "../reducers";


import AsyncStorage from '@react-native-community/async-storage';

const authConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer'],
};
const reducer = persistReducer(authConfig, AllReducers);
const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store as default, persistor };