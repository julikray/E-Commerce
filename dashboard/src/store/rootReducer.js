import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducer";
import categoryReducer  from './Reducers/categoryReducer.js';
import   productReducer   from './Reducers/productReducer.js';
import sellerReducer from './Reducers/sellerReducer.js';
import  orderReducer from './Reducers/orderReducer.js';
import chatReducer from './Reducers/chatReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    category : categoryReducer,
    product : productReducer,
    seller : sellerReducer,
    order: orderReducer,
    chat : chatReducer,
});

export default rootReducer;
