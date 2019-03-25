import React, { Component } from 'react'
import SimpleCard from './simpleCard.js'
import Land from '../images/landing.jpg'
import Logo from '../images/logo.png'

export default class Landing extends Component {
  render() {
    return (
    <div>
      <div>
        <img src={Land} alt="Landing" style={{width: "100%", height: "50%", backgroundSize: 'cover', zIndex: 0}}/>
        <div style={{fontSize: 35, color: "white", textAlign: 'center', position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <h1>  
               <img src={Logo} alt="logo" style={{ width: 100, height: 100, verticalAlign: "bottom"}} /> 
               Alternative Dojo 2.0
            </h1>
        </div>
        <SimpleCard/>

      </div>
    </div>
    )
  }
}
