import React, { Component } from 'react';
import './App.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> Testcoin Faucet </h3>
        <FormContainer />
      </div>
    );
  }
}

export default App;
