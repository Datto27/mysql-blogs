import React, { useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../helpers/AuthContext'


const CreatePost = () => {
  const navigate = useNavigate()
  const {authState} = useAuthContext()

  const initialValues = {
    title: "",
    postText: "",
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  })

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login")
    }
  }, [])

  const handleSubmit = async (data) => {
    // console.log(data)
    axios.post("http://localhost:4000/posts", data, {
      headers: {accessToken: localStorage.getItem("accessToken")}
    })
    .then(response => {
      console.log("post created")
    })
    .then(() => {
      navigate("/")
    })
  }

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        <Form className='postForm'>
          <label htmlFor="title">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="postInput" name="title" placeholder="title"
            autocomplate="off" />
          <label htmlFor="title">Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field id="postInput" name="postText" placeholder="body"
            autocomplate="off"  />
          <button type="submit" className='btn'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
