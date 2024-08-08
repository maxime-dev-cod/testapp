import React, { useState } from 'react'
import ArrowLeft from '../../../assets/images/arrowLeft.svg'
import heroImage from '../../../assets/images/passwordResetImg.svg'
import './index.css'
import { useNavigate } from 'react-router-dom'
import {  resetPasswordLinkAction } from '../../../redux/auth/auth.actions'
import { useDispatch } from 'react-redux'
const PasswordReset = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch() 
  const [passwordResetForm, setPasswordResetForm] = useState({})
  const handleInputChange=(e)=>{
    e.preventDefault();

    setPasswordResetForm((prevState) => {
        return {
            ...prevState,
            [e.target.id]: e.target.value
        };
    });
  }
  const handleSubmit=()=>{
    dispatch(resetPasswordLinkAction(passwordResetForm))
  }
  return (
    <div className='passwordResetComponentWrapper'>
    <div className='passwordResetComponentForm'>
       <div className='passwordResetTexts'>
       <div className='passwordResetTitle'>Forgot Password?</div>
        <div className='passwordResetInstruction'>Please enter the necessary information:</div>
         <div className='passwordResetEmailLabel'>Email</div>
       </div>
        <div className='emailInputWrapper'>
         <input id="email" className='emailInputBar' placeholder="Please enter your  email" onChange={(e)=>handleInputChange(e)}/>
        </div>
        <div className='passwordResetButton' onClick={()=>{handleSubmit()}}>
            <div>Submit</div>
        </div>
        <div onClick={()=>navigate("/login")} className='signUpLink' style={{display:'flex',alignItems:'center', gap:'4px'}}><div><img style={{display:'flex',alignItems:'center',width:'24px', height:'24px'}} src={ArrowLeft}/></div> <div>Back to <span >Sign In</span></div></div>
    </div>
    <div className='passwordResetHeroImage'><img src={heroImage}/></div>
</div>
  )
}

export default PasswordReset