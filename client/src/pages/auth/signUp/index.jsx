import React, { useState } from 'react'
import googleLogo from '../../../assets/images/googleLogo.svg'
import emailLogo from '../../../assets/images/emailLogo.svg'
import ArrowLeft from '../../../assets/images/arrowLeft.svg'
import ArrowRightWhite from '../../../assets/images/arrowRightWhite.svg'
import heroImage from '../../../assets/images/signUp.svg'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../../../redux/auth/auth.actions'
import VerifyOTP from '../verifyOTP'
const SignUp = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [signUpForm, setSignupForm] = useState({})
    const {openOTPModal}=useSelector((state)=>state.auth)
    
    const handleInputChange=(e)=>{
      e.preventDefault();

      setSignupForm((prevState) => {
          return {
              ...prevState,
              [e.target.id]: e.target.value
          };
      });
    }
    const handleSubmit=()=>{
      dispatch(signupAction(signUpForm))
    }
  
   if(openOTPModal){
    return (<VerifyOTP/>)
   }
    
  return (
    <div className='signupComponentWrapper'>
    <div className='signupComponentForm'>
        <div className='signUpTexts'>
        <div className='signupTitle'>SignUp</div>
        <div className='signupInstruction'>Please enter the necessary information:</div>
        <div className='signUpEmailLabel'>Email</div>
        </div>

        <div className='emailInputWrapper'>
      
         <input id="email" className='emailInputBar' placeholder="Enter  your  email" onChange={(e)=>handleInputChange(e)}/>
        
        </div>
        <div className='loginPasswordLabel'> <div className='loginEmailLabel'>Name</div></div>
        <div className='emailInputWrapper'>
      
      <input id="name" className='emailInputBar' placeholder="Enter your name" onChange={(e)=>handleInputChange(e)} />
     
     </div>
        <div className='loginPasswordLabel'> <div className='loginEmailLabel'>Password</div></div>
        <div className='emailInputWrapper'>
      
      <input id="password" className='emailInputBar' placeholder="Enter your password" onChange={(e)=>handleInputChange(e)}/>
     
     </div>
        <div className='signupButton'onClick={()=>{handleSubmit()}}>
            <div>Sign Up</div>
            
        </div>
  
        <div className='signUpLink'>Have an account? <span onClick={()=>navigate("/login")}>Sign In</span></div>
    </div>
    <div className='signupHeroImage'><img src={heroImage}/></div>
</div>
  )
}

export default SignUp