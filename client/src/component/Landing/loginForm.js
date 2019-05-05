import React, { Component } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import {Col, Form, Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index'

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
});

const mapStateToProps = (state) => ({ user: state });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


class LoginForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        noUser: false,
        wrongPassword: false
      }
    }

    handleSubmit = async (e) => {
      await this.props.loginUser(e.email, e.password, this.props.history)
      await this.props.getUserInfo()
    }


    render(){
        return(
            <>
        <Formik
          validationSchema={schema}
          onSubmit={this.handleSubmit.bind(this)}
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
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
            </>
        )
    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));