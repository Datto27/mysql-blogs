import React, { useState, useEffect } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import { useAuthContext } from '../helpers/AuthContext'
import PostCard from '../components/PostCard'


const Post = () => {
  let {id} = useParams()
  const navigate = useNavigate()
  const [postObj, setPostObj] = useState("")
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const {authState} = useAuthContext()

  useEffect(() => {
    // console.log(postObj)
    axios.get(`http://localhost:4000/posts/postById/${id}`).then((response) => {
      // console.log(response.data)
      setPostObj(response.data.data)
    })
    axios.get(`http://localhost:4000/comments/${id}`).then((response) => {
      // console.log(response.data.data)
      setComments(response.data.data)
    })
  }, [])
  
  const addComment = () => {
    axios.post(`http://localhost:4000/comments`, 
      {commentBody:newComment, PostId:id},
      {headers: {
        accessToken: localStorage.getItem("accessToken")
      }}
      )
      .then((response) => {
        // console.log(response.data)
        if (response.data.error) {
          console.log("comment error")
        } else {
          setNewComment("")
          setComments([...comments, response.data])
        }
      })
  }
  const deleteComment = (id) => {
    axios.delete(`http://localhost:4000/comments/${id}`, {
        headers:{accessToken: localStorage.getItem("accessToken")}
      })
      .then(() => {
        let newComments = comments.filter(comment => comment.id !== id)
        console.log("clicked ", id)
        setComments(newComments)
      })
  }
  

  return (
    <div>
      <PostCard postObj={postObj} setPostObj={setPostObj}
        id={id} authState={authState}
      />
      <div className="commentsSection">
        <div className='addComment'>
          <input type="text" placeholder="comment..." autoComplete="off"
            className='input'
            value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button className='btn' onClick={addComment}>Add Comment</button>
        </div>
        <div className="commentsList">
          {comments && comments.map((comment, i) => {
            return <div key={i} className="comment">
              <h3>{comment.commentBody}</h3>
              <p>{comment.username}</p>
              {authState.username === comment.username && 
                <button className='delete' onClick={() => deleteComment(comment.id)}>X</button>
              }
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
