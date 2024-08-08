import React, { useState } from 'react'
import googleLogo from '../../../assets/images/googleLogo.svg'
import emailLogo from '../../../assets/images/emailLogo.svg'
import ArrowLeft from '../../../assets/images/arrowLeft.svg'
import ArrowRightWhite from '../../../assets/images/arrowRightWhite.svg'
import logInHeroImage from '../../../assets/images/loginImg.svg'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from '../../../redux/auth/auth.actions'
import { setOpenOTPModal } from '../../../redux/auth/auth.slice'
const LogIn = () => {
  
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [loginForm, setloginForm] = useState({})
    const handleInputChange=(e)=>{
      e.preventDefault();

      setloginForm((prevState) => {
          return {
              ...prevState,
              [e.target.id]: e.target.value
          };
      });
    }
    const handleSubmit=()=>{
      dispatch(loginAction(loginForm))
    }
    const navigateSignUp=()=>{
      navigate("/signup")
      dispatch(setOpenOTPModal(false))
    }

  return (
    <div className='loginComponentWrapper'>
    <div className='loginComponentForm'>
        <div className='loginTexts'>
        <div className='loginTitle'>LogIn</div>
        <div className='loginInstruction'>Please enter the necessary information:</div>
        <div className='loginEmailLabel'>Email</div>
        </div>

        <div className='emailInputWrapper'>
      
         <input id="email" className='emailInputBar' placeholder="Enter  your  email" onChange={(e)=>handleInputChange(e)}/>
        
        </div>
        <div className='loginPasswordLabel'> <div className='loginEmailLabel'>Password</div></div>
        <div className='emailInputWrapper'>
      
      <input id="password" className='emailInputBar' placeholder="Enter your password" onChange={(e)=>handleInputChange(e)}/> 
     
     </div>
        <div className='loginButton' onClick={()=>{handleSubmit()}}>
            <div>Sign In</div>
            
        </div>
       
        <div className='loginAlternatives'>
        <div className='loginLink'>Don't have an account? <span onClick={()=>navigateSignUp()}>Sign Up</span></div>
        <div className='loginLink'> <span onClick={()=>navigate("/passwordReset")}>Reset Password</span></div>
        </div>
    
    </div>
    <div className='loginHeroImage'><img src={logInHeroImage}/></div>
</div>
  )
}

export default LogIn