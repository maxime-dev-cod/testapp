import React, { useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getEmailVerification, verifyOTP } from '../../../redux/auth/auth.actions'
const VerifyOTP = () => {

  const dispatch=useDispatch()
  const UserSessionDataString = localStorage.getItem("UserSessionData");
  const UserSessionData = JSON.parse(UserSessionDataString);
  const {openOTPModal}=useSelector((state)=>state.auth)
  const [otp, setOTP] = useState([null, null, null, null, null, null]);
  const{email}=useSelector((state)=>state.auth)
  const inputRefs = useRef([]);
  

  const handleOTPChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === '') { // Allow only digits and empty string
      const newOTP = [...otp];
      newOTP[index] = value === '' ? null : parseInt(value, 10); // Store null for empty string
      setOTP(newOTP);

      // Move to the next input box if a digit is entered
      if (value.match(/^[0-9]$/) && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const formattedOTP = parseInt(otp.map(num => num !== null ? num : '').join(''), 10);
  
  const handleSubmit=()=>{

    dispatch(verifyOTP({otp:formattedOTP,email}))
  }
  const resendOTP=()=>{
    setOTP([null, null, null, null, null, null])
    dispatch(getEmailVerification({email}))
  }
  return (
    <div className='OTPPage'>
    <div className='verifyOTPCardWrapper'>
      
        <div className='verifyOTPContentWrapper'>
 <div className='verifyOTPText'>
    <div className='verifyOTPCardHeader'>Enter The code</div>
    <div className='verifyOTPCardSubHeader'>We already sent a 6 digit OTP to your email address
</div>
{/* <div className='emailSentTo'>pixelpro360@gmail.cm</div> */}
 </div>
 <div className='enterOTPLabel'>Verify OTP Card Header</div>
 <div className='inputOTPSection'>
 {otp.map((num, index) => (
        <div key={index}>
          <input
            ref={el => inputRefs.current[index] = el}
            className='inputOTPBox'
            maxLength="1"
            value={num === null ? '' : num}
            onChange={(e) => handleOTPChange(index, e.target.value)}
          />
        </div>
      ))}
  
 </div>
        </div>
        <div className='verifySection'>
            <div className='verifyButton' onClick={()=>{handleSubmit()}}> Verify Now</div>
            <div className='resendCodeText'>Didn't receive the code?  <span onClick={()=>resendOTP()}>Re-send</span></div>
        </div>

    </div>
    </div>
  )
}

export default VerifyOTP