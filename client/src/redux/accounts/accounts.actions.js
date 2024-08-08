import axiosInstance from '../../axios/axios'
import swal from "sweetalert";
import {  setAllFinanceAccounts, setIsInvestmentModalOpen, setLoading } from './accounts.slice';
export const createAccountAction = (createAccountData, next) => async (dispatch) => {
    try {
        const headers = {
            Authorization: "Bearer " + createAccountData.token,
            "Content-Type": "application/json"
        };

        const encodedData = {
                name: createAccountData.investmentForm.name,
                amount: createAccountData.investmentForm.amount,
                accountType:createAccountData.investmentForm.accountType
               
            
        };

const { data } = await axiosInstance.post("/api/v1/accounts/create", encodedData,{headers});
        if (data ) {
            
            dispatch(getAllAccountsAction({token:createAccountData.token,userId:createAccountData.user_id})) 
            swal({
                position: "top-end",
                icon: "success",
                title: data,
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(setIsInvestmentModalOpen(false))
            return;
        }
    } catch (error) {
        console.log(error);

        swal({
            position: "top-end",
            icon: "warning",
            title: error.response.data,

            timer: 1300
        });
    }
};
export const updateAccountAction = (updateAccountData, next) => async (dispatch) => {
    try {
        const headers = {
            Authorization: "Bearer " + updateAccountData.token,
            "Content-Type": "application/json"
        };

        const encodedData = {
                name: updateAccountData.investmentForm.name,
                amount: updateAccountData.investmentForm.amount,
                accountType:updateAccountData.investmentForm.accountType
               
            
        };
       

const { data } = await axiosInstance.post("/api/v1/accounts/updateUserAccounts", encodedData,{headers});
        if (data ) {
    
            dispatch(getAllAccountsAction({token:updateAccountData.token,userId:updateAccountData.user_id})) 
            swal({
                position: "top-end",
                icon: "success",
                title: data,
                showConfirmButton: false,
                timer: 1500
            });
            
            dispatch(setIsInvestmentModalOpen(false))
            return;
        }
    } catch (error) {
        console.log(error);

        swal({
            position: "top-end",
            icon: "warning",
            title: error.response.data,

            timer: 1300
        });
    }
};
export const deleteAccountAction = ( deleteAccountData, next) => async (dispatch) => {
    try {
        const headers = {
            Authorization: "Bearer " + deleteAccountData.token,
            "Content-Type": "application/json"
        };


        const encodedData = {
                id: deleteAccountData.accountId         
        };
       

const { data } = await axiosInstance.post("/api/v1/accounts/deleteAccount", encodedData,{headers});

        if (data ) {
    
            dispatch(getAllAccountsAction({token:deleteAccountData.token,userId:deleteAccountData.user_id})) 
            swal({
                position: "top-end",
                icon: "success",
                title: data,
                showConfirmButton: false,
                timer: 1500
            });
            
        
            return;
        }
    } catch (error) {
        console.log(error);

        swal({
            position: "top-end",
            icon: "warning",
            title: error.response.data,

            timer: 1300
        });
    }
};
export const getAllAccountsAction = (accountData, next) => async (dispatch) => {
    try {
        dispatch(setLoading(true))

        const headers = {
            Authorization: "Bearer " + accountData.token,
            "Content-Type": "application/json"
        };

        const encodedData = {
            userId: accountData.userId   
        };

        const { data } = await axiosInstance.get("/api/v1/accounts/getUserAccounts", {
            headers: headers,
            params: encodedData
          });
          
          dispatch(setLoading(false))
        if (data ) {
  dispatch(setAllFinanceAccounts(data))

            return;
        }
        
    } catch (error) {
        console.log(error);

  
    }
};