import React, { Component } from 'react';
import Landing from './component/Landing/landing'
import Dashboard from './component/dashboard/dashboard'
import PayrollAdmin from './component/payroll/payrollAdmin'
import './App.css'
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import Profile from './component/profile/profile'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions/index';
import GithubOnboard from './component/Landing/githubOnboard'
import Forbidden from './component/error_pages/forbidden';
import Loading from './component/utils/loading'

// import Authentication from './component/utils/auth'
const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


const PrivateRoute = ({ component: Component, isAdmin, isAuthenticated,  ...rest}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : isAdmin ? <Redirect to='/403' /> : <Redirect to='/' />
  )} />
)

class App extends Component {
  constructor(){
    super()
    this.state = {
      authorized: null,
    }
  }

  logout = () => {
      return <Redirect to="/"/>
      // this.props.logout(this.props.history)
    }


  render() {
    let authorized = this.props.auth.authorized
    let admin = this.props.auth.acl
    return (
    <Router>
        <div>  
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={authorized}/>
          <PrivateRoute path="/profile" component={Profile} isAuthenticated={authorized}/>
          <PrivateRoute path="/payroll-admin" component={PayrollAdmin} isAdmin={true} isAuthenticated={authorized && admin==="Admin"}/>
          <Route path="/github-onboard/:email" component={GithubOnboard} />
          <Route path="/github-success" component={GithubOnboard} />
          <Route path="/403" component={Forbidden} />
          <Route path='/loading' component={Loading}/>
          <Route path='/logout'/>
        </div>
    </Router>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
