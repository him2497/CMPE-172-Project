import React, { Component } from 'react'
import SimpleCard from './simpleCard.js'
import Land from '../images/landing.jpg'
import Logo from '../images/logo.png'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

export default class Landing extends Component {
  render() {
    return (
    <Container fluid style={{padding: "0px"}}>
        {/* <img src={Land} alt="Landing" style={{minWidth: '375px', width: "100%", height: "100%", backgroundSize: 'cover', zIndex: 0}}/> */}
        <Image src={Land} fluid />
        <Container fluid 
        style={styles.textContainer}>
            <img src={Logo} alt="logo" style={{ width: 100, height: 100}} /> 
            <h1 style={{fontSize: 50, color: "white"}}>  
               Alternative Dojo 2.0
            </h1>
        </Container>
        <SimpleCard/>
    </Container>
    )
  }
}


const styles = {
  textContainer: {
    textAlign: 'center', 
    position: 'absolute', 
    top: '30%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    marginTop: '-100px'
    }
}