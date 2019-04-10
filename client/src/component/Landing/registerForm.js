import React, { Component } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import {Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  birthdate: yup.date().required(),
  gender: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),

});


class RegisterForm extends Component {
  constructor(){
    super()
    this.state = {
      emailTaken: false,
    }
  }

    FormExample = () => {
      return (
        <Formik
          validationSchema={schema}
          onSubmit={this.handleRegister}
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
              <Form.Label style={{color: 'red'}}>{this.state.emailTaken ? "This email has already been taken" : ""}</Form.Label>
              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikFirstName">
                  <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName ? "Please enter your first name" : ""}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikLastName">
                  <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {"Please enter your last name"}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikEmail">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      autoComplete="username email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                    <Form.Label>Password</Form.Label>  
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        autoComplete="current-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" onChange={handleChange} isInvalid={!!errors.gender}
                    name="gender">
                    <option>Choose...</option>
                    <option>M</option>
                    <option>F</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {"Please select your gender"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikBirthdate">
                    <Form.Label>Birth date</Form.Label>  
                      <Form.Control
                        type="date"
                        name="birthdate"
                        onChange={handleChange}
                        isInvalid={!!errors.birthdate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {"Please enter your Birth Date"}
                      </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>

              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      );
    }

    handleRegister = (e) => {
      axios.post('/auth/register', {
        "email": e.email, 
        "password": e.password,
        "first_name": e.firstName,
        "last_name": e.lastName,
        "birth_date": e.birth_date,
        "gender": e.gender
      }).then((res) => {
        if(res.data.info === "That email is already taken."){
          console.log("object")
          this.setState({
            emailTaken: true
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


export default withRouter(RegisterForm)