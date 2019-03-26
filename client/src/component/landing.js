import React, { Component } from 'react'
import SimpleCard from './utils/simpleCard.js'
import Land from '../images/landing.jpg'
import Logo from '../images/logo.png'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import Link from 'react-router-dom/Link'
import GoogleLogo from '../images/google.png'
import GithubLogo from '../images/github-logo.png'
import EmailLogo from '../images/email.png'

export default class Landing extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
    <div style={{padding: "0px"}}>
      <Image src={Land} fluid />
      <Container fluid style={styles.textContainer}>
          <img src={Logo} alt="logo" style={{ width: 100, height: 100}} /> 
          <h1 style={{fontSize: 50, color: "white"}}>  
              Alternative Dojo 2.0
          </h1>
          <br/>
          <br/>
          <h2 style={{color: 'white'}}>Login using SSO</h2>
          <ButtonToolbar style={{justifyContent: "center"}}>
            <Link to='/dashboard'>
              <Button variant="light" style={styles.button}>
                <img alt="Google Login" src={GoogleLogo} style={styles.logo}/>
                Login with Google
              </Button>
            </Link>
            <Link to='/dashboard'>
              <Button variant="light" style={styles.button}>
                <img alt="Github Login" src={GithubLogo} style={styles.logo}/>
                Login with Github
              </Button>
            </Link>
            <Link to='/dashboard'>
              <Button variant="light" style={styles.button}>
                <img alt="Email Login" src={EmailLogo} style={styles.logo}/>
                Login with Email
              </Button>
            </Link>
            <Button  onClick={this.handleShow} style={styles.button}>
              Signup
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{textAlign: 'center'}}>
                <Button variant="outline-info" style={styles.button}>
                  <img alt="Google Login" src={GoogleLogo} style={styles.logo}/>
                  Signup with Google
                </Button>
                <br/>
                <Button variant="outline-info" style={styles.button}>
                  <img alt="Github Login" src={GithubLogo} style={styles.logo}/>
                  Signup with Github
                </Button>
                <br/>
                <Button variant="outline-info" style={styles.button}>
                  <img alt="Email Login" src={EmailLogo} style={styles.logo}/>
                  Signup with Email
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </ButtonToolbar>
      </Container>
      <SimpleCard/>
    </div>
    )
  }
}


const styles = {
  textContainer: {
    padding: "0px",
    textAlign: 'center', 
    position: 'absolute', 
    top: '40%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    marginTop: '-100px'
    },
    button: {
      margin: "10px"
    },
    logo:{
      height: "35px",
      paddingRight: '10px',
      verticalAlign: 'middle',
    }
}