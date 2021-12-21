import React, {useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from "axios";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import PageNotFound from "./Pages/PageNotFound";
import {useAuthContext} from "./helpers/AuthContext"
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";


function App() {
  const {authState, setAuthState} = useAuthContext()

  useEffect(() => {
    // if (localStorage.getItem("accessToken")) {
    //   setAuthState(true)
    // }
    axios.get(`http://localhost:4000/auth/check-user`, {headers:{
        accessToken: localStorage.getItem("accessToken")
      }})
      .then(response => {
        // console.log(response)
        if (response.data.error) {
          setAuthState({...authState, status:false})
        } else {
          setAuthState({id:response.data.id, 
            username:response.data.username, 
            status:true
          })
        }
      })
  }, [])

  const signout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username:"", id:"", status:false})
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navBar">
          <Link to="/">Go home page</Link>
          {authState.status ? (
            <>
              <Link to="/create-post">Create a post</Link>
              <button className="nav-btn" onClick={signout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Registration</Link>
              <Link to="/login">Log in</Link>
            </>
          )}
          <h1 className="username">{authState.username}</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="login" element={<Login/>} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="change-password" element={<ChangePassword/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
