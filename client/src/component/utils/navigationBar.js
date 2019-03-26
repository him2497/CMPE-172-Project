import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Logo from '../../images/logo.png'
import {Link} from 'react-router-dom'

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
          <Link to='/dashboard'>
            <Nav.Link href="#">Home</Nav.Link>
          </Link>
          {/* <Link to='/profile'> */}
            <Nav.Link href="#profile">Profile</Nav.Link>
          {/* </Link> */}
          {/* <Link to='/settings'> */}
            <Nav.Link href="#settings">Settings</Nav.Link>
          {/* </Link> */}
            <Nav.Link href="#payroll">Payroll</Nav.Link>

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