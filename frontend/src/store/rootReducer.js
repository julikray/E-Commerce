import { combineReducers } from '@reduxjs/toolkit';
import  homeReducer  from './reducers/homeReducer';
import  authReducer  from './reducers/authReducer';
import cardReducer from './reducers/cardReducer';
import  orderReducer  from './reducers/orderReducer';
import dashboardReducer  from './reducers/dashboardReducer';
import  chatReducer  from './reducers/chatReducer';


const rootReducer = combineReducers({
     home: homeReducer,
     auth: authReducer,
     card: cardReducer,
     order: orderReducer,
     dashboard: dashboardReducer,
     chat: chatReducer
 
});

export default rootReducer;
