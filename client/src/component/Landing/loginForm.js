import React, { Component } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import {Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
});


class LoginForm extends Component {
    constructor(){
      super()
      this.state = {
        noUser: false,
        wrongPassword: false
      }
    }

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
              <Form.Label style={{color: 'red'}}>{this.state.noUser ? "No user with the email found" : ""}</Form.Label>
              <Form.Label style={{color: 'red'}}>{this.state.wrongPassword ? "Incorrect password" : ""}</Form.Label>
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
      axios.post('/auth/login', {
        "email": e.email, 
        "password": e.password
      }).then((res) => {
        if(res.data.info === "No user found."){
          this.setState({
            noUser: true
          })
        }else if(res.data.info === "Oops! Wrong password."){
          this.setState({
            wrongPassword: true
          })
        }else if(res.data.info === "Success"){
          this.props.history.push('/dashboard')
        }
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


export default withRouter(LoginForm);