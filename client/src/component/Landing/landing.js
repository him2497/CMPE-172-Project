import React, { Component } from 'react'
import SimpleCard from '../utils/simpleCard.js'
import Land from '../../images/landing.jpg'
import Logo from '../../images/logo.png'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import GoogleLogo from '../../images/google.png'
import GithubLogo from '../../images/github-logo.png'
import EmailLogo from '../../images/email.png'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import Footer from '../utils/footer'
export default class Landing extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      loginShow: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleLoginShow = () => {
    this.setState({ loginShow: true });
  }

  handleLoginClose = () => {
    this.setState({ loginShow: false });
  }


  render() {
    return (
    <div style={{padding: "0px"}}>
      <Image src={Land} fluid />
      <Container fluid style={styles.textContainer}>
          <img src={Logo} alt="logo" style={{ width: 100, height: 100}} /> 
          <h1 style={{fontSize: 50, fontFamily: 'Germania One', color: "white"}}>  
              Alternative Dojo 2.0
          </h1>
          <br/>
          <br/>
          <h2 style={{color: 'white'}}>Login using SSO</h2>
          <ButtonToolbar style={{justifyContent: "center"}}>
          <a href='/auth/google'>              <Button variant="light" style={styles.button}>
                <img alt="Google Login" src={GoogleLogo} style={styles.logo}/>
                Login with Google
              </Button>
            </a>
            <a href='/auth/github'>
              <Button variant="light" style={styles.button}>
                <img alt="Github Login" src={GithubLogo} style={styles.logo}/>
                Login with Github
              </Button>
            </a>

            <Button variant="light" style={styles.button} onClick={this.handleLoginShow}>
              <img alt="Email Login" src={EmailLogo} style={styles.logo}/>
              Login with Email
            </Button>

            <Button  onClick={this.handleShow} style={styles.button}>
              Signup
            </Button>
            

            {/* Login Modal */}
            <Modal show={this.state.loginShow} onHide={this.handleLoginClose} size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
                  </Modal.Header>
                    <Modal.Body style={{textAlign: 'center'}}>
                      <LoginForm />
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleLoginClose}>
                    Close
                  </Button>
              </Modal.Footer>
            </Modal>
            

            <Modal show={this.state.show} onHide={this.handleClose} size="lg"
              aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{textAlign: 'center'}}>
                <RegisterForm/>
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
      <br/>
      <br/>
      <Footer />
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