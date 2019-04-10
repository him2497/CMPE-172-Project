import React, { Component } from 'react';
import Landing from './component/Landing/landing'
import Dashboard from './component/dashboard/dashboard'
import PayrollAdmin from './component/payroll/payrollAdmin'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from './component/profile/profile'
import Test from './component/Landing/registerForm'
class App extends Component {
  render() {
    return (
    <Router>
        <div>  
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/payroll-admin" component={PayrollAdmin} />
          <Route path="/test" component={Test} />

        </div>
    </Router>
    );
  }
}

export default App;
