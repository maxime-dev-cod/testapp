import React, { useState } from 'react'
import closeButton from '../../assets/images/closeButton.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setIsEditProfileModalOpen } from '../../redux/accounts/accounts.slice'
import { updatePersonalInfoAction } from '../../redux/auth/auth.actions'

const EditProfile = () => {
 const dispatch=useDispatch()
 const UserSessionDataString = localStorage.getItem("UserSessionData");
 const UserSessionData = JSON.parse(UserSessionDataString); 
 const [profileForm, setProfileForm] = useState({name:UserSessionData.name})

    const handleCloseEditProfile=()=>{
      dispatch(setIsEditProfileModalOpen(false))
    }
   
 
    const handleInputChange=(e)=>{
      e.preventDefault();

      setProfileForm((prevState) => {
          return {
              ...prevState,
              [e.target.id]: e.target.value
          };
      });
    }
    const handleSubmit=()=>{
      dispatch(updatePersonalInfoAction({name:profileForm.name,token:UserSessionData.token,userId:UserSessionData.user_id}))
      handleCloseEditProfile()
   
   }
  return (
    <div className='investmentFormWrapper'>
    <div className='closeButton' onClick={()=>{ handleCloseEditProfile()  }}><img src={closeButton}/></div>
   <div className='investmentContentContainer'>
      
       <div className='formHeader'> Edit Profile</div>
       <div className='formInstructions'>Please enter user details</div>
     
       <div className='label'>Name</div>
       <div  >
           <input className='inputField' placeholder='Please enter new name' id="name" defaultValue={profileForm.name} onChange={(e)=>{handleInputChange(e)}}></input>
       </div>
 
   

<div className='submitButtonWrapper'>
<div className='submitButton' onClick={()=>{handleSubmit()}}>Submit</div>
</div>
   </div>

</div>
  )
}

export default EditProfile