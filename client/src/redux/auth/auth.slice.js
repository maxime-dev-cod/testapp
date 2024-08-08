import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: {},
    token: "",
    user_id :"",
    name:"",
    email:"",
    openOTPModal:false
 
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.token = action.payload.token;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.user_id = action.payload.user_id;
        },
        setOpenOTPModal: (state, action) => {
           
            state.openOTPModal= action.payload;
        }
        
      
     
      
    }
});

export const { setUser,setOpenOTPModal} = authSlice.actions;

export default authSlice.reducer;
