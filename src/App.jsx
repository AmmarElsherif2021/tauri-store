import React from "react";
//import Hello from "./Hello/Hello";
import Login from "./Container/Login";
import "./App.css";
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Praferences/Preferences";

function App() {
  return (
    <div className="app">
      <h1>Application</h1>
      <Dashboard/>
      <Preferences/>
    </div>
  
  )
}

export default App;
