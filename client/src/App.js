import React, { Component } from 'react';
import Landing from './component/landing'
import Dashboard from './component/dashboard/dashboard'
import PayrollAdmin from './component/payroll/payrollAdmin'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
    <Router>
        <div>  
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Dashboard} />
          <Route path="/settings" component={Dashboard} />
          <Route path="/payroll-admin" component={PayrollAdmin} />
        </div>
    </Router>
    );
  }
}

export default App;
