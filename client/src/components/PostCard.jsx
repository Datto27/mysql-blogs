import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const PostCard = ({postObj, setPostObj=null, authState, id}) => {
  const navigate = useNavigate()

  const deletePost = (postId) => {
    axios.delete(`http://localhost:4000/posts/${postId}`, {
      headers: {accessToken: localStorage.getItem("accessToken")}
    })
    .then((response) => {
      alert(response.data)
      navigate("/")
    })
  }
  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter New Title: ")
      // id - useParams()-dan
      console.log(newTitle)
      if (newTitle) {
        axios.patch(`http://localhost:4000/posts/update-title`, {newTitle, id}, {
          headers: {accessToken: localStorage.getItem("accessToken")}
        })
        setPostObj({...postObj, title: newTitle})
      }
    } else {
      let newText = prompt("Enter new Post Text: ")
      if (newText) {
        axios.patch(`http://localhost:4000/posts/update-text`, {newText, id}, {
          headers: {accessToken: localStorage.getItem("accessToken")}
        })
        setPostObj({...postObj, postText: newText})
      }
    }
  }

  return (
    <div className="post" style={{paddingTop:"10px", paddingBottom:"10px"}}>
      <div className="postHeader">
        {authState.username === postObj?.username && (
          <button className='delete' onClick={() => deletePost(postObj.id)}>X</button>
        )}
        <h3 onClick={() => {
          console.log(authState.username, postObj?.username)
          authState.username === postObj?.username && editPost("title")
        }}>
          {postObj?.title}
        </h3>
      </div>
      <p>{postObj?.data?.createdAt}</p>
      <div className="postBody">
        <p onClick={() => {
          authState.username === postObj?.username && editPost("body")
        }}>
          {postObj?.postText}
        </p>
        <h4 onClick={() => navigate(`/profile/${postObj?.UserId}`)}>{postObj?.username}</h4>
      </div>
    </div>
  )
}

export default PostCard
