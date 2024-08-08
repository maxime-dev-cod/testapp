import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import authReducer from './auth/auth.slice';
import accountReducer from './accounts/accounts.slice'
const rootReducer = combineReducers({
    auth: authReducer,
    account:accountReducer
})
export const store = configureStore({
  reducer: rootReducer
})