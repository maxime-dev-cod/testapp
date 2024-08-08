import { createSlice } from "@reduxjs/toolkit";


const initialState = {
 allFinanceAccounts:[],
 editAccountStatus:false,
 selectedAccount:"",
 isInvestmentModalOpen:false,
 isEditProfileModalOpen:false,
 darkMode:false,
 loading:false
 
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAllFinanceAccounts: (state, action) => {
            state.allFinanceAccounts = action.payload;
          
        }, 
        setEditAccountStatus: (state, action) => {
            state.editAccountStatus = action.payload;
          
        },
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload;
          
        },
        setIsInvestmentModalOpen: (state, action) => {
            state.isInvestmentModalOpen = action.payload;
          
        },
        setIsEditProfileModalOpen: (state, action) => {
            state.isEditProfileModalOpen = action.payload;
          
        },
        setDarkMode:(state, action) => {
            state.darkMode = action.payload;
          
        },
        setLoading:(state, action) => {
            state.loading = action.payload;
          
        },
        
    }
});

export const { setAllFinanceAccounts,setEditAccountStatus,setSelectedAccount,setIsInvestmentModalOpen,setIsEditProfileModalOpen,setDarkMode,setLoading} = accountSlice.actions;

export default accountSlice.reducer;
