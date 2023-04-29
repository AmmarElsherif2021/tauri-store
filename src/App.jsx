//check for: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import React from 'react';
import './App.css';

import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Preferences from './Preferences/Preferences';

function App() {
  return (
    <div className="app">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard"  element={<Dashboard/>}/>
          <Route path="/Preferences" element={<Preferences/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;