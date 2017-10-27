import React, { Component } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import './App.css';
import router from './router';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        {router}
      </div>
    );
  }
}

export default App;
