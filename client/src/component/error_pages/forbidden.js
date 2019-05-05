import React, { Component } from 'react'
import './forbidden.scss'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'


const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

class forbidden extends Component {

  redirect = (e) => {
    e.preventDefault()
    if(this.props.auth.authorized){
      this.props.history.push("/Dashboard")
    }else{
      this.props.history.push("/")
    }
  }


  render() {
    return (
      <div style={body}>
        <h1 className="text">
          <span>403</span>
        </h1>
        <br/>
        <br/>
        <br/>
        <br/>

        <Button onClick={this.redirect}>Redirect to {this.props.auth.authorized ? "Dashboard" : "Login Page"}</Button>
      </div>
    )
  }
}


const body = {
    "width": "100%", 
    "height": "100vh",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "flexDirection": "column",
    "backgroundImage": "linear-gradient(45deg, #f6d200 25%, #181617 25%, #181617 50%, #f6d200 50%, #f6d200 75%, #181617 75%, #181617 100%)"
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(forbidden))
