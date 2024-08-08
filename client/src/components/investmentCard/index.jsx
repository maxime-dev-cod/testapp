import React, { useEffect, useRef } from 'react'
import './index.css'
import cryptoWallet from '../../assets/images/cryptocurrency-wallet.svg'
import bank from '../../assets/images/bank.svg'
import money from '../../assets/images/money-bag.svg'
import stocks from '../../assets/images/stocks.png'
import { useState } from 'react'
import OptionsMenu from '../optionsMenu'
import { useSelector } from 'react-redux'

const InvestmentCard = ({account}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null);
  const {darkMode}=useSelector((state)=>state.account)

  useEffect(() => {
    const handleOutsideClick = (event) => {

      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);
  


  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <div className='investmentCardContainer'>  
    <div className='investmentCardHeaderSection'>  <div className='investmentBurgerMenu' onClick={()=>{setMenuOpen(true)}}>   <svg width="30" height="30"   fill="var(--text-color)"  viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg></div> </div>
    {menuOpen && <OptionsMenu ref={menuRef} account={account}/>}
  
        <div className='investmentContentWrapper'>
        <div className='investmentCardContent'>
        <div className='investmentTypeIcon'>
          {account.accountType === "Crypto"  && <img src={cryptoWallet}/> }
  
          {account.accountType === "Bank"  && <img src={bank}/>}
          {account.accountType === "Stocks"  && <img src={stocks}/>}
          {account.accountType === "Other"  && <img src={money }/>}

          </div>
        <div className='investmentInfoContainer'>
        <div className='investmentName'>{account.name}</div>
            <div className='investmentFunds'>{account.amount}</div>
        </div>
     
        </div>
      
      
        </div>
    
    </div>
    </div>
  )
}

export default InvestmentCard