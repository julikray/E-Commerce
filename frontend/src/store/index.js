import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer.js'


const store = configureStore({
    reducer : rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
  
})

export default store;