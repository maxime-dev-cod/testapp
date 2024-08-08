import { useEffect, useState } from 'react'
import './App.css'
import LogIn from './pages/auth/login'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SignUp from './pages/auth/signUp';
import PasswordReset from './pages/auth/passwordResetLink';
import HomePage from './pages/homePage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccountsAction } from './redux/accounts/accounts.actions';
import OldPasswordReset from './pages/auth/resetOldPassword';
import { getUserPersonalInfo } from './redux/auth/auth.actions';
function App() {
  const dispatch=useDispatch()
  const UserSessionDataString = localStorage.getItem("UserSessionData");
  const UserSessionData = JSON.parse(UserSessionDataString);
  const {currentUser}=useSelector((state)=>state.auth)
  const allowedPublicPages = ["/login", "/signup", "/reset-password/:token", "/passwordReset"];

  const navigate = useNavigate();
  useEffect(() => {
    if (UserSessionData && UserSessionData.token) {
      // User is logged in, perform necessary actions
      navigate("/");
      dispatch(getAllAccountsAction({ token: UserSessionData.token, userId: UserSessionData.user_id }));
      dispatch(getUserPersonalInfo({ id: UserSessionData.user_id, token: UserSessionData.token }));
    } else {
      // User is not logged in, check if the current path is allowed
      const isAllowedPage = allowedPublicPages.some(page => {
        // Handle the dynamic token route separately
        if (page === "/reset-password/:token") {
          const resetPasswordRegex = /^\/reset-password\/[^/]+$/;
          return resetPasswordRegex.test(location.pathname);
        }
        return location.pathname === page;
      });

      if (!isAllowedPage) {
        // Navigate to login if not an allowed public page
        navigate("/login");
      }
    }

  }, [UserSessionDataString, dispatch, location.pathname,navigate]);
 

return (
  
   <Routes>
     <Route path="/" element={ <HomePage/>} />
   <Route path="/login" element={ <LogIn/>} />
   <Route path="/signup" element={ <SignUp/>} />
   <Route path="/passwordReset" element={ <PasswordReset/>} />
   <Route path="/reset-password/:token" element={<OldPasswordReset />} />


   </Routes>
  )
}

export default App
