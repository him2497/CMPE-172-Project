import React, { Component } from 'react';
import Landing from './component/landing'
import Dashboard from './component/dashboard'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
    <Router>
        <div>  
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
    );
  }
}

export default App;
