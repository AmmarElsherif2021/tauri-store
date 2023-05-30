//check for: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import {React, useState} from 'react';
import './App.css';
//import Login from './Container/Login';
import { BrowserRouter,Routes, Route,Link} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import home from'./icons8-home-150.png'
import Hello from './Hello/Hello'
import Bill from './Bill/Bill';
import ViewDB from './ViewDB/ViewDB';
import Archive from './Archive/Archive';
import Return from './Return/Return';
//import Preferences from './Preferences/Preferences';
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

        
          <Link to="/Hello" ><img className='home-btn' src={home}/></Link>
       

        <Routes>
           
          <Route  path="/"  forceRefersh={true} element={<Hero/>}/>
          <Route  path="Hello"  element={<Hello/>}/>
          <Route path="Bill" element={<Bill/>}/>
          <Route path="ViewDB" element={<ViewDB/>}/>
          <Route path="Archive" element={<Archive/>}/>
          <Route path="Return" element={<Return/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;