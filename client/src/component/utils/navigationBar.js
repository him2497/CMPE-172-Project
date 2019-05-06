import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from "react-router-bootstrap"
import Logo from '../../images/logo.png'
import NavLink from 'react-bootstrap/NavLink';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import {withRouter} from "react-router-dom";
import axios from 'axios';

const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


class NavigationBar extends React.Component {

  constructor(){
    super()
    this.state = {
      admin: false
    }
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logout(this.props.history)
    localStorage.removeItem('persist:root')
    if(document.cookie.includes("jwt")){
      axios.get(process.env.REACT_APP_API_URL+"/auth/logout")
    }
  }

  componentDidMount(){
    if(this.props.auth.authorized === true){
      this.props.isAdmin(this.props.auth.token)
    }
  }

  render() {
    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/dashboard" style={{fontFamily: 'Germania One'}}>
          <img alt="logo" style={{height:'25px', verticalAlign:'sub', paddingRight: '5px'}} src={Logo}/>
          Alternative Dojo 2.0
        </Navbar.Brand>
        <Nav className="mr-auto">
            <LinkContainer to="/dashboard">
              <NavLink>Home</NavLink>
            </LinkContainer>

            <LinkContainer to="/profile">
              <NavLink>Profile</NavLink>
            </LinkContainer>
            {
              this.props.auth.acl === "Admin" ? 
              <LinkContainer to="/payroll-admin">
                <NavLink>Payroll</NavLink>
              </LinkContainer>
              :
              <></>

            }
        </Nav>
        <Form inline>
          <a href='/logout' onClick={this.logout}>
            <Button variant="danger">Logout</Button>
          </a>
        </Form>
      </Navbar>
    </>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));