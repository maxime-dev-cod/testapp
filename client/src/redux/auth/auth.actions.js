import axiosInstance from '../../axios/axios'
import { getAllAccountsAction } from '../accounts/accounts.actions.js';
import { setLoading } from '../accounts/accounts.slice.js';
import {  setOpenOTPModal, setUser } from './auth.slice.js';
import swal from "sweetalert";
export const loginAction = (loginData, next) => async (dispatch) => {
    try {
        const encodedData = {
         
                email: loginData.email,
                password: loginData.password
            
        };

const { data } = await axiosInstance.post("/api/v1/auth/signIn", encodedData);

        if (data ) {
            const formated = {
                token: data.data.token,
                email:data.data.email,
                user_id: data.data._id,
                name:data.data.name,

                ...data
            };

            localStorage.setItem("UserSessionData", JSON.stringify(formated));  
            dispatch(getAllAccountsAction({token:formated.token,userId:formated.user_id}))        
            dispatch(setUser(formated));
            
            return;
        }
    } catch (error) {
        console.log(error);

        swal({
            position: "top-end",
            icon: "warning",
            title: error.response.data.message,

            timer: 1300
        });
    }
};
export const signupAction = (signUpData, next) => async (dispatch) => {
    
    try {
        const encodedData = {
                email: signUpData.email,
                password: signUpData.password,
                name:signUpData.name
            
        };

const { data } = await axiosInstance.post("/api/v1/auth/signUp", encodedData);

  
if(data.message==='Signed up successfully'){
    dispatch(getEmailVerification({email:signUpData.email}))
    dispatch(setUser({email:signUpData.email}));
    return;
}
        if (data=== 'User with similar details already exists. Please sign in.') {
            swal({
                position: "top-end",
                icon: "warning",
                title:data,
    
                timer: 1300
            });
          
         
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
export const resetPasswordLinkAction = (resetPasswordData, next) => async (dispatch) => {
    try {
     
        const encodedData = {
                email: resetPasswordData.email,        
        };

const { data } = await axiosInstance.post("/api/v1/auth/get-reset-password-link", encodedData);

        if (data.message ) {
            swal({
                position: "top-end",
                icon: "success",
                title: data.message,
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
export const updatePersonalInfoAction = (personalData, next) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const headers = {
            Authorization: "Bearer " + personalData.token,
            "Content-Type": "application/json"
        };
        const encodedData = {
              
                name:personalData.name,
                id:personalData.userId
            
        };

const { data } = await axiosInstance.post("/api/v1/auth/updatePersonalInfo", encodedData,{headers});
dispatch(setLoading(false))
        if (data ) {
            dispatch(getUserPersonalInfo({id:personalData.userId,token:personalData.token}))
            swal({
                position: "top-end",
                icon: "success",
                title: data.message,
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
export const getEmailVerification = (verificationData, next) => async (dispatch) => {
    try {

    const encodedData = {
        email: verificationData.email,        
};



const { data } = await axiosInstance.post("/api/v1/auth/getEmailVerificationOtp", encodedData);
        if (data.message ) {
            
          await  swal({
                position: "top-end",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1000
            });
            dispatch(setOpenOTPModal(true))
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
export const verifyOTP = (verificationData, next) => async (dispatch) => {
    try {

    const encodedData = {
        email: verificationData.email,  
        otp: verificationData.otp
};


const { data } = await axiosInstance.post("/api/v1/auth/verifyEmail", encodedData);

if(data.message ==='Email verified successfully' ){
    swal({
        position: "top-end",
        title: data.message,
        showConfirmButton: false,
        timer: 1500
    });
    dispatch(setOpenOTPModal(false))
    
    
    
}      
else if  (data ) {
            swal({
                position: "top-end",
     
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
export const resetOldPasswordAction = (resetPasswordData, next) => async (dispatch) => {
    try {
        const headers = {
            Authorization: "Bearer " + resetPasswordData.token,
            "Content-Type": "application/json"
        };
        const encodedData = {
                password: resetPasswordData.password,    
                token:     resetPasswordData.token
        };

const { data } = await axiosInstance.post("/api/v1/auth/resetPassword", encodedData,{headers});

        if (data.message ) {
            swal({
                position: "top-end",
                icon: "success",
                title: data.message,
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
export const getUserPersonalInfo=(userData,next)=>async(dispatch)=>{
    try {
        const headers = {
            Authorization: "Bearer " + userData.token,
            "Content-Type": "application/json"
        };
        const encodedData = {
            id: userData.id
        
    };
    
    
    const { data } = await axiosInstance.get("/api/v1/auth/personalInfo", {
        headers: headers,
        params: encodedData
      });
   
            if (data ) {
         dispatch(setUser({name:data[0].name}))
         
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
}