import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik" 
import * as Yup from "yup"
import axios from "axios"


function Registration() {

  const initialValues = {
    username: "",
    password: "",
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  })

  const handleSubmit = (data) => {
    axios.post(`http://localhost:4000/auth/`, data).then(() => {
      console.log(data)
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
          <button className='btn' type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
