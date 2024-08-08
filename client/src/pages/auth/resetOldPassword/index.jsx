import React, { useState } from 'react'
import ArrowLeft from '../../../assets/images/arrowLeft.svg'
import heroImage from '../../../assets/images/passwordResetImg.svg'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom'
import {  resetOldPasswordAction } from '../../../redux/auth/auth.actions'
import { useDispatch } from 'react-redux'
const OldPasswordReset = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch() 
  const { token } = useParams();
  
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
    dispatch(resetOldPasswordAction({password:passwordResetForm.password,token}))
  }
  return (
    <div className='oldPasswordResetComponentWrapper'>
    <div className='oldPasswordResetComponentForm'>
       <div className='oldPasswordResetTexts'>
       <div className='oldPasswordResetTitle'>Reset Password</div>
        {/* <div className='oldPasswordResetInstruction'>Please enter the necessary information:</div> */}
         <div className='oldPasswordResetEmailLabel'>New Password</div>
       </div>
        <div className='emailInputContainer'>
         <input id="password" className='emailInputBar' placeholder="Please enter your  new password" onChange={(e)=>handleInputChange(e)}/>
        </div>
        <div className='oldPasswordResetButtonSection'>
        <div className='oldPasswordResetButton' onClick={()=>{handleSubmit()}}>
            <div>Submit</div>
        </div>
        <div onClick={()=>navigate("/login")} className='signUpLink' style={{display:'flex',alignItems:'center', gap:'4px'}}><div><img style={{display:'flex',alignItems:'center',width:'24px', height:'24px'}} src={ArrowLeft}/></div> <div>Back to <span >Sign In</span></div></div>
        </div>
    </div>
  
</div>
  )
}

export default OldPasswordReset