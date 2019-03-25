import React, { Component } from 'react'
import LandingImg from '../images/landing.jpg'
import SimpleCard from './simpleCard.js'
import Logo from '../images/logo.png'

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
        
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
        
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
        
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


  render() {
    return (
    <div>
      <div>
        <img src={LandingImg} alt="Landing" style={{width: this.state.width, height: "50%", backgroundSize: 'cover', zIndex: 0}}/>
        <div style={{fontSize: 35, textAlign: 'center', position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
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
