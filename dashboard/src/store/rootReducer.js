import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducer";
import categoryReducer  from './Reducers/categoryReducer.js';
import   productReducer   from './Reducers/productReducer.js';
import sellerReducer from './Reducers/sellerReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    category : categoryReducer,
    product : productReducer,
    seller : sellerReducer,
});

export default rootReducer;
