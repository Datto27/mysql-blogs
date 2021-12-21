import React, {useState} from 'react'
import axios from 'axios'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword ] = useState("")
  
  const changePassword = () => {
    axios.patch(`http://localhost:4000/auth/change-password`,
      {oldPassword, newPassword},
      {headers: {
        accessToken: localStorage.getItem("accessToken")
      }}  
    ).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        alert(response.data)
        setOldPassword("")
        setNewPassword("")
      }
    })
  }

  return (
    <div>
      <h1>Change Your Password</h1>
      <input type="text" className='input' placeholder='old password' 
        onChange={(e) => setOldPassword(e.target.value)} />
      <input type="text" className='input' placeholder='new password'
        onChange={(e) => setNewPassword(e.target.value)} />
      <button className='btn' onClick={changePassword}>Save Changes</button>
    </div>
  )
}

export default ChangePassword
