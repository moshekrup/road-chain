import React from 'react'
import logo from './logo.svg';
import BaseMap from './Components/BaseMap/BaseMap';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <BaseMap lat={51.505} lng={-0.09} zoom={18}/>
        </header>
      </div>
    );
  }
}