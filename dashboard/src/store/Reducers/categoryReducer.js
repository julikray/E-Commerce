import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
 

export const categoryAdd = createAsyncThunk(
    'auth/categoryAdd',
    async({name , image },{rejectWithValue , fulfillWithValue }) => {
         
        try {
            const formDate = new FormData()
            formDate.append('name' , name)
            formDate.append('image' , image)
            const {data} = await api.post('/category-Add' , formDate , { withCredentials : true } ) 
              
            // console.log(data)
            return fulfillWithValue(data)
            
        } catch (error) {
            // console.log(error.response.data)
            return  rejectWithValue(error.response.data)
            
        }
    }

)


export const getCategory  = createAsyncThunk(
    'auth/getCategory',
    async({ parPage , page , searchValue },{rejectWithValue , fulfillWithValue }) => {
         
        try {
            

            const {data} = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage} `, { withCredentials : true } ) 
              
            // console.log(data)
            return fulfillWithValue(data)
            
        } catch (error) {
            // console.log(error.response.data)
            return  rejectWithValue(error.response.data)
            
        }
    }

)





export const categoryReducer = createSlice({
    name: 'category',
    initialState:{
        successMessage : '',
        errorMessage : '',
        loader : false,
        categorys : [],
        totalCategory:0
    },
    reducers:{

        messageClear:(state , _ ) =>{
            state.errorMessage = ""
        }

    },
    extraReducers:(builder)=> {
        builder
        .addCase(categoryAdd.pending, (state , {payload}) => {
            state.loader = true;
        } )

        .addCase(categoryAdd.rejected, (state , {payload}) => {
            state.loader = false;
            state.errorMessage = payload.error
        } )

        .addCase(categoryAdd.fulfilled, (state , {payload}) => {
            state.loader = false;
            state.successMessage = payload.message
            state.categorys = [...state.categorys , payload.categorys]
           
        } )



        .addCase(getCategory.fulfilled, (state , {payload}) => {
           
            state.totalCategory = payload.totalCategory
            state.categorys = payload.categorys
           
        } )
        





    }

})
export const {messageClear} = categoryReducer.actions
export default categoryReducer.reducer