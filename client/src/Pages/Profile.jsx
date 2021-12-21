import React, {useState} from 'react'
import { useEffect } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { useAuthContext } from '../helpers/AuthContext'


const Profile = () => {
  let {userId} = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const {authState} = useAuthContext()

  useEffect(() => {
    console.log(userId)
    axios.get(`http://localhost:4000/auth/profile/${userId}`)
      .then(response => {
        // console.log(response.data)
        setUser(response.data)
      })
    axios.get(`http://localhost:4000/posts/byUserId/${userId}`, {
      headers: {accessToken: localStorage.getItem("accessToken")}
    })
    .then(response => {
      setUserPosts(response.data)
    })
  }, [])

  return (
    <div className='profilePage'>
      <div className="profileInfo">
        Username: <label>{user.username}</label>
        {authState.username === user.username && (
          <button className='btn' onClick={() => navigate("/change-password")}>Change Password</button>
        )}
      </div>
      <div className="listOfPosts">
        {userPosts.map((post, i) => {
          return <div key={i} className='post' 
              onClick={() => navigate(`/post/${post.id}`)}
            >
            <div className="postHeader">
              <h4 className='title'>{post.title}</h4>
              <label>{post.createdAt}</label>
            </div>
            <p className='body'>{post.postText}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default Profile
