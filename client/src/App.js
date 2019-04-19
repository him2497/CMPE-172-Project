import React, { Component } from 'react';
import Landing from './component/Landing/landing'
import Dashboard from './component/dashboard/dashboard'
import PayrollAdmin from './component/payroll/payrollAdmin'
// import PrivateRoute from './component/PrivateRoute'
import './App.css'
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import Profile from './component/profile/profile'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions/index';
// import Authentication from './component/utils/auth'
const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


const PrivateRoute = ({ component: Component, isAuthenticated,  ...rest}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)
class App extends Component {

  constructor(){
    super()
    this.state = {
      authorized: false
    }
  }
  


  async componentDidMount(){
    console.log(this.props.auth.authorized)
    console.log(this.props)
    await this.setState({authorized: this.props.auth.authorized })
  }


  render() {
    return (
    <Router>
        <div>  
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={this.state.authorized}/>
          <Route path="/profile" component={Profile} />
          <Route path="/payroll-admin" component={PayrollAdmin} />
          {/* <Route path='/logout' render={() => this.props.logout(this.props.history)}/> */}
        </div>
    </Router>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));;
