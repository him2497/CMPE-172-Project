import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


class loading extends Component {

  checkAuth = () => {
    setTimeout(() => {
      if(document.cookie.includes("jwt")){
        let token = document.cookie.substring(4,)
        this.props.authorized(token)
      }

      if(this.props.auth.authorized){
        this.props.history.push("/dashboard")
      }else{
        this.props.history.push("/403")
      }
    }, 2000)
  }


  render() {
    this.checkAuth()
    return (
      <Container >
          <div style={{textAlign: 'center', padding: '35%'}}>
            <Spinner variant="primary" style={{height: "100px", width: '100px'}} animation="grow" />
          </div>
      </Container>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(loading)