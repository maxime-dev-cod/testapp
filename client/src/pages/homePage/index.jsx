import React, { useState } from 'react'
import './index.css'
import Header from '../../components/header'
import InvestmentCard from '../../components/investmentCard'
import OptionsMenu from '../../components/optionsMenu'
import InvestmentForm from '../../components/investmentForm'
import Modal from "react-modal";
import EditProfile from '../../components/editProfileForm'
import { useDispatch, useSelector } from 'react-redux'
import { setEditAccountStatus, setIsEditProfileModalOpen, setIsInvestmentModalOpen, setSelectedAccount } from '../../redux/accounts/accounts.slice'
import VerifyOTP from '../auth/verifyOTP'
import Loader from '../../components/loader'

const HomePage = () => {
  const dispatch=useDispatch()
  const {darkMode}=useSelector((state)=>state.account)
  const UserSessionDataString = localStorage.getItem("UserSessionData");
  const UserSessionData = JSON.parse(UserSessionDataString);
  const {currentUser}=useSelector((state)=>state.auth);
  const{isInvestmentModalOpen}=useSelector((state)=>state.account)
  const{isEditProfileModalOpen}=useSelector((state)=>state.account)
  const {allFinanceAccounts}=useSelector((state)=>state.account)
  const {loading}=useSelector((state)=>state.account)
  const openEditProfile=()=>{
    
   dispatch(setIsEditProfileModalOpen(true))
  }
  const closeEditProfile=()=>{
    dispatch(setIsEditProfileModalOpen(false))
    
      }
  const openInvestmentModal = () => {
    dispatch(setEditAccountStatus(false))
    dispatch(setSelectedAccount(""))
    dispatch(setIsInvestmentModalOpen(true))
    
  };

  const closeInvestmentModal = () => {
    dispatch(setIsInvestmentModalOpen(false))
  };


  return (
  <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <div className='homePageWrapper' >
        <Header  openEditProfile={openEditProfile} openInvestmentModal={openInvestmentModal}/>
        {loading && <Loader/>}
        {!loading && 
        <>
        <div className='homePageContentContainer'>
            <div className='welcomeHeaderContainer'>   
            <div className='welcomeHeader'>  <span>👋Hi {currentUser.name}</span>, Welcome Back!</div>
            <div className='createNewButton' onClick={()=>openInvestmentModal()}> Create New</div>  
            </div>
      
   
        <div className='investmentInstitutionsWrapper'>
            <div  className='investmentInstitutions'>
              {allFinanceAccounts.map((account,index)=>(
                      <div key={index}>  <InvestmentCard  account={account}/></div>
              ))}
               


        </div>
        </div>
        </div>
        <Modal 
    isOpen={isInvestmentModalOpen} onRequestClose={closeInvestmentModal}
    className="showModal"
     >
< InvestmentForm />
</Modal>
<Modal 
    isOpen={isEditProfileModalOpen} onRequestClose={closeEditProfile}
    className="showModal"
     >
< EditProfile  />
</Modal>
        </>
}



    </div>
    </div>
  
  )
}

export default HomePage