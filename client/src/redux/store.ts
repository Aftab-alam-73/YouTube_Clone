import {configureStore} from '@reduxjs/toolkit'
import videoReducer from './videoSlice'
import userReducer from './userSlice'
import darkModeReducer from './darkmodeSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig={
    key:"root",
    version: 1,
    storage
}
const reducer=combineReducers({
    "video": videoReducer,
    "user": userReducer,
    "darkMode": darkModeReducer
})
const persistedReducer=persistReducer(persistConfig, reducer)
 export const store= configureStore({
    reducer:persistedReducer
       
    
 })