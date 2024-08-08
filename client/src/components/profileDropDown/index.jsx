import React from 'react'
import './index.css'
import userImage from '../../assets/images/loginImg.svg'
import userProfile from '../../assets/images/userProfile.svg'
import userSettings from '../../assets/images/userSettings.svg'
import signOut from '../../assets/images/SignOut.svg'
import { useSelector } from 'react-redux'
import { setUser } from '../../redux/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
const ProfileDropDown  = React.forwardRef((props,ref) => {
  const {currentUser}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const handleLogOut=()=>{
    localStorage.removeItem("UserSessionData")
    setUser("")
    navigate("/login")

  }
  return (
    <div className='dropDownWrapper' ref={ref}>
        <div className='dropDownContentWrapper'>
        <div className='currentProfileInfoContainer'>   
        </div>
        <div className='userInfo'>
                <div className='userPhoto'> <img src={userProfile}/></div>
                <div className='userName'>{currentUser.name}</div>
            </div>
        <div className='dropDownSettingsSection'>
        <div className='dropDownDividingBorder'></div>
        <div className='editProfile' style={{cursor:"pointer"}} onClick={()=>{props.openEditProfile()}}>
            <div className='editProfileIcon'> <img src={userSettings}/></div>
            <div className='editProfileText'>Edit Profile </div>
        </div>
        <div className='dropDownDividingBorder'></div>
        <div className='addInvestment' style={{cursor:"pointer"}} onClick={()=>props.openInvestmentModal()}>
        <div className='addInvestmentIcon'> <img src={userSettings}/></div>
        <div className='addInvestmentText'> New Investment </div> 
        </div>
        <div className='dropDownDividingBorder'></div>
        </div>
     
        <div className='logoutButton' style={{cursor:"pointer"}} onClick={()=>{handleLogOut()}}>
            <div className='logoutLogo'><img src={signOut}/></div>
            <div className='logoutText'>Logout</div>
        </div>
        </div>

    </div>
  )
})

export default ProfileDropDown;