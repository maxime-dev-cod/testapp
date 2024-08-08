import React from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import { setEditAccountStatus, setIsInvestmentModalOpen, setSelectedAccount } from '../../redux/accounts/accounts.slice'
import { deleteAccountAction } from '../../redux/accounts/accounts.actions'

const OptionsMenu = React.forwardRef((props,ref) => {
  const dispatch=useDispatch()
  const UserSessionDataString = localStorage.getItem("UserSessionData");
  const UserSessionData = JSON.parse(UserSessionDataString);
  const handleEditAccount=()=>{
    dispatch(setEditAccountStatus(true))
    dispatch(setSelectedAccount(props.account))
    handleOpenModal()
  }
 
  const handleDeleteAccount=()=>{
    swal({
      text: "Are you sure you want to delete this account?",
      icon: "warning",
      buttons: {
          cancel: true,
          confirm: {
              value: "delete"
             
          }
      }
  }).then((value) => {
      let newData;
      switch (value) {
          case "delete":
            dispatch(deleteAccountAction({ token:UserSessionData.token,userId:UserSessionData.user_id,accountId:props.account._id}))
              break;
      }
  });

  }
  const handleOpenModal=()=>{
    dispatch(setIsInvestmentModalOpen(true))
}
  return (
    <div className='optionsMenuWrapper' ref={ref}>
        <div className='optionsContentWrapper'>
        
          
            <div className='option' onClick={()=>{handleDeleteAccount()}}>
                <div className='optionIcon'>
             <svg width="14" height="14"  fill="red" viewBox="0 0 16 16">
                <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
             </svg>
                </div>
                <div className='deleteText'>Delete</div>
            </div>
            <div className='option'>
                <div className='optionIcon'>
                <svg width="14" height="14"  fill="#000000" viewBox="0 0 16 16">
                     <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>                                                     
                </div>
                <div className='optionText' onClick={()=>handleEditAccount()}>Edit</div>
            </div>
        
        </div>

    </div>
  )
})

export default OptionsMenu