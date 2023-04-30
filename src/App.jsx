//check for: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import {React, useState} from 'react';
import './App.css';
import Login from './Container/Login';
import { BrowserRouter,Routes, Route,Link} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

import Hello from './Hello/Hello'
import Bill from './Bill/Bill';
import AddCarpet from './AddCarpet/AddCarpet';
import Preferences from './Preferences/Preferences';
import Hero from './Hello/Hero/Hero';

//import useToken from './useToken';

function App() {
  //const { token, setToken } = useToken();
  //const [token, setToken] = useState();
  /*if(!token) {
    return <Login setToken={setToken} />
  }*/
  
  return (
    <div className="app">
    
      <BrowserRouter>

        <button>
          <Link to="/Hello" >Home </Link>
        </button>

        <Routes>
           
          <Route  path="/"  forceRefersh={true} element={<Hero/>}/>
          <Route  path="/Hello"  element={<Hello/>}/>
          <Route path="/Bill" element={<Bill/>}/>
          <Route path="/AddCarpet" element={<AddCarpet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;