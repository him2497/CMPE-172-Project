import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import {Col, Form, Button} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup'
import axios from 'axios'


const schema = yup.object({
    password: yup.string().required(),
    birthdate: yup.date().required(),
    gender: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

export default class githubOnboard extends Component {

  
    handleRegister = (e) => {
      console.log(this.props.method)
          axios.post(process.env.REACT_APP_API_URL+'/auth/register/SSO', {
            "email": this.props.match.params.email, 
            "password": e.password,
            "first_name": e.firstName,
            "last_name": e.lastName,
            "birth_date": e.birthdate,
            "gender": e.gender,
            "SSO": this.props.method
          }).then((res) => {
              console.log(res.data.info)
            if(res.data.info === "That email is already taken."){
              this.setState({
                emailTaken: true
              })
            }else if(res.data.info === "Success"){
              console.log("object")
              this.props.history.push('/loading')
            }
          }).catch(err => {
            console.log(err)
          })
      }
  


  render() {
      let email = this.props.match.params.email
    return (
      <Container>
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
                    <Form.Group as={Col}>
                      <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={email}
                            name="email"
                            onChange={handleChange}
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
      </Container>
    )
  }
}
