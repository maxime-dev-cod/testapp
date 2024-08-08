import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import userProfile from '../../assets/images/userProfile.svg'
import dropdownArrow from '../../assets/images/dropdownArrow.svg'
import { BsFillMoonStarsFill } from "react-icons/bs";
import lightModeImg from '../../assets/images/light.png'
import ProfileDropDown from '../profileDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, setEditAccountStatus, setIsEditProfileModalOpen, setIsInvestmentModalOpen, setSelectedAccount } from '../../redux/accounts/accounts.slice';
const Header = () => {
  const dispatch=useDispatch()
     const {darkMode}=useSelector((state)=>state.account)
     const [openProfile, setOpenProfile] = useState(false);
     const [isDarkMode, setIsDarkMode] = useState(false)
     const profileRef = useRef(null);

     const openEditProfile=()=>{
      dispatch(setIsEditProfileModalOpen(true))
      setOpenProfile(false)
      
        }
    const openInvestmentModal = () => {
      dispatch(setEditAccountStatus(false))
      dispatch(setSelectedAccount(""))
      dispatch(setIsInvestmentModalOpen(true))
     
      // setIsInvestmentModalOpen(true);  
    };
     useEffect(() => {
       const handleOutsideClick = (event) => {
   
         if (openProfile && profileRef.current && !profileRef.current.contains(event.target)) {
          setOpenProfile(false);
         }
       };
     
       document.addEventListener('mousedown', handleOutsideClick);
     
       return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
       };
     }, [openProfile]);
    const toggleDarkMode = () => {
      dispatch(setDarkMode(!isDarkMode))
      setIsDarkMode(!isDarkMode)
    };
    
  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <div className='headerWrapper'>
        <div className='headerContentWrapper'>
        <div className='logo'></div>
        <div className='headerMenuContent'>
            <div className='themeMode' onClick={()=>toggleDarkMode()}>
            {darkMode ?    
            <div className='lightMode' > <img  src={lightModeImg}/></div>
            :
            <div className='darkMode' > <BsFillMoonStarsFill style={{fontSize:'24px'}}/></div>
          
            }
            </div>
            <div className='userProfile' onClick={()=>{setOpenProfile(!openProfile)}}>
                <div className='profileImg'> <img src={userProfile}/></div>
                {!openProfile && <div className='dropDownArrow'>          
                 
                                    
                                    
                                    <svg
                                        data-accordion-icon
                                        width="14px"
                                        height="14px"
                                        aria-hidden="true"
                                        style={{ transform: "rotate(180deg)" }} 
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                             stroke="var(--text-color)"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2px"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                    </div>}
                {openProfile &&<div>
                  <svg
                                        data-accordion-icon
                                        width="14px"
                                        height="14px"
                                        style={{ transform: "rotate(0deg)" }} 
                                        fill="none"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                    
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="var(--text-color)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2px"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg></div>}
            </div>
        </div>
        </div>
    </div>
    {openProfile && <ProfileDropDown openEditProfile={openEditProfile} openInvestmentModal={openInvestmentModal}  ref={profileRef} />}
    </div>
  )
}

export default Header