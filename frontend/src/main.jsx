import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import store from './store/index.js'
 

createRoot(document.getElementById('root')).render(
    <Provider store={store} >

      <App />
      <ToastContainer 
      
       toastOptions={{
          position: "top-right",
          style: {
            background: "white",
            color: "black"
          }
        }}
      
      />
    </Provider>
  
)



