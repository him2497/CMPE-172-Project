import React, { Component } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import {Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'


const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
});


export default class LoginForm extends Component {

    FormExample = () => {
      return (
        <Formik
          validationSchema={schema}
          onSubmit={this.handleLogin}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
  
                <Form.Group as={Col} controlId="validationFormikUsername">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col} controlId="validationFormikUsername">
                  <Form.Label>Password</Form.Label>  
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      );
    }

    handleLogin = (e) => {
      console.log(e)
      axios.post('/auth/login', {
        "email": e.email, 
        "password": e.password
      }).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }


    render(){
        return(
            <>
                {this.FormExample()}
            </>
        )
    }

}