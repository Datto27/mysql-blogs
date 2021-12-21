import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuthContext } from '../helpers/AuthContext';


const Home = () => {
  const navigate = useNavigate()
  const [postsList, setPostsList] = useState([])
  const [likedPosts, setLikedPosts] = useState("")
  const {authState} = useAuthContext()
  
  useEffect(() => {
    // console.log(authState.status)
    if (!localStorage.getItem("accessToken")) {
      navigate("/login")
    } else {
      axios.get("http://localhost:4000/posts", {
        headers: {accessToken: localStorage.getItem("accessToken")}  // authMiddleware-tvis
      })
      .then((response) => {
        // console.log(response.data)
        setPostsList(response.data.listOfPosts)
        // current useris mier dalaikebuli postebis id-ebi
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId
        }))
      })
    }
  }, [])

  const likePost = (postId) => {
    axios.post("http://localhost:4000/like", {postId:postId}, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then((response) => {
      // console.log(response.data)
      const updatedPosts = postsList.map((post) => {
        // frontshi postis likebis zrda kleba. shesabamisi postis modzebna
        // da like-bis mokleba da momateba imis mixedvit tu ra response-a
        if (post.id === postId) {
          // console.log(post)
          if (response.data.liked) {
            // console.log({...post, Likes: [...post.Likes, 0]})
            return {...post, Likes: [...post.Likes, 0]}
          } else {
            const likesArr = post.Likes
            likesArr.pop()
            return {...post, Likes: likesArr}
          }
        } else {
          return post
        }
      })
      setPostsList(updatedPosts)
      // like icon-is feris shecvla imis mixedit misi postis id
      // aris tu ara likedPosts-s id-ebshi
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter(id => id !== postId))
      } else {
        setLikedPosts([...likedPosts, postId])
      }
    })
  }

  return (
    <div className='homePage'>
      {postsList.map((post, i) => {
        return (
          <dir key={i} className="post" >
            <h2 className="title" onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h2>
            <h2 className="body">{post.postText}</h2>
            <h2 className="footer">
              <p className='author' onClick={() => navigate(`/profile/${post.UserId}`)}>{post.username}</p>
              <div className="like">
                {likedPosts.includes(post.id) ? 
                  <FavoriteIcon onClick={() => likePost(post.id)} />
                  : <FavoriteBorderIcon onClick={() => likePost(post.id)} />
                }              
                <label>{post.Likes.length}</label>
              </div>
            </h2>
          </dir>
        )
      })}
    </div>
  )
}

export default Home
