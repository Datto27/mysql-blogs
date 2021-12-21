import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useNavigate } from 'react-router-dom' 
import * as Yup from "yup"
import axios from "axios"
import { useAuthContext } from '../helpers/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const {setAuthState} = useAuthContext()

  const initialValues = {
    username: "",
    password: "",
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  })

  const handleSubmit = (data) => {
    axios.post(`http://localhost:4000/auth/login`, data).then((response) => {
      // console.log(response)
      if (response.data.error) {
        alert(response.data.error)
      } else {
        localStorage.setItem("accessToken", response.data.token)
        setAuthState({username:response.data.username, id:response.data.id, status:true})
        navigate("/")
      }
    })
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        <Form className='postForm'>
          <ErrorMessage name="username" component="span" />
          <Field id="postInput" name="username" placeholder="username"
            autocomplate="off" />
          <ErrorMessage name="password" component="span" />
          <Field id="postInput" name="password" placeholder="password"
            type="password" autocomplate="off" />
          <button className='btn' type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
