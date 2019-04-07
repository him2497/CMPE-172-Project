import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from "react-router-bootstrap"
import Logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import NavLink from 'react-bootstrap/NavLink';

class NavigationBar extends React.Component {

  render() {
    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/dashboard">
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

            <LinkContainer to="/payroll-admin">
              <NavLink>Payroll</NavLink>
            </LinkContainer>
        </Nav>
        <Form inline>
          <Link to='/'>
            <Button variant="danger">Logout</Button>
          </Link>
        </Form>
      </Navbar>
    </>
    );
  }
}


export default NavigationBar;