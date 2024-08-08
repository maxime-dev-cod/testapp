import React, { useState } from 'react'
import './index.css'
import dropdownArrow from '../../assets/images/dropdownArrow.svg'
import closeButton from '../../assets/images/closeButton.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createAccountAction, updateAccountAction } from '../../redux/accounts/accounts.actions'
import { setIsInvestmentModalOpen } from '../../redux/accounts/accounts.slice'
const InvestmentForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {editAccountStatus}=useSelector((state)=>state.account)
    const {selectedAccount}=useSelector((state)=>state.account)
    const [investmentForm, setInvestmentForm] = useState({accountType: selectedAccount.accountType ||" Select type of  investment"})
    const UserSessionDataString = localStorage.getItem("UserSessionData");
    const UserSessionData = JSON.parse(UserSessionDataString);
 
    const handleInputChange=(e)=>{
      e.preventDefault();

      setInvestmentForm((prevState) => {
          return {
              ...prevState,
              [e.target.id]: e.target.value
          };
      });
    }
    const handleDropdownChange = (e) => {
        e.preventDefault();
        const selectedValue = e.target.getAttribute("data-value"); // Use "data-value" attribute to store the value
        setInvestmentForm((prevState) => {
            return {
                ...prevState,
                [e.target.id]: selectedValue
            };
        });
        // Perform any actions with the selected value here
    };
    const handleCloseModal=()=>{
        
        dispatch(setIsInvestmentModalOpen(false))
    }
    const handleSubmit=()=>{
       if(editAccountStatus){
          console.log("we  editing")
          dispatch(updateAccountAction({investmentForm, token:UserSessionData.token,userId:UserSessionData.user_id}))
          }
     else{
        dispatch(createAccountAction({investmentForm, token:UserSessionData.token,userId:UserSessionData.user_id}))
       }
    
    }
    


  return (
    <div className='investmentFormWrapper'>
         <div className='closeButton' onClick={()=>{handleCloseModal()}}><img src={closeButton}/></div>
        <div className='investmentContentContainer'>
           
            <div className='formHeader'>{editAccountStatus ? "Edit Investment" :"Create New Investment"} </div>
            <div className='formInstructions'>Please enter Investment details</div>
          
            <div className='label'>Name</div>
            <div  >
                <input id="name" defaultValue={selectedAccount.name} className='inputField' placeholder='Please enter investment name' onChange={(e)=>handleInputChange(e)}></input>
            </div>
            <div className='label' >Balance</div>
            <div className='inputWrapper' id="amount">
                <input id="amount" defaultValue={selectedAccount.amount} className='inputField' placeholder='Please enter investment balance' onChange={(e)=>handleInputChange(e)}></input>
            </div>
        
     <div className="dropdown">
    <button className="dropbtn">
        <div>{investmentForm.accountType}</div>
     <div><img src={dropdownArrow}/></div></button>
    <div className="dropdown-content">
        <div className='dropDownOption' id="accountType" data-value="Crypto" onClick={(e)=>handleDropdownChange(e)} >Crypto</div>
        <div className='dropDownOption' id="accountType"  data-value="Stocks"onClick={(e)=>handleDropdownChange(e)} >Stocks</div>
        <div className='dropDownOption' id="accountType"  data-value="Bank"onClick={(e)=>handleDropdownChange(e)} >Bank</div>
        <div className='dropDownOption' id="accountType"  data-value="Other" onClick={(e)=>handleDropdownChange(e)} >Other</div>
    </div>
</div>
<div className='submitButtonWrapper'>
    <div className='submitButton' onClick={()=>{handleSubmit()}}>Submit</div>
</div>
        </div>

    </div>
  )
}

export default InvestmentForm