//check for: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import {React, useState} from 'react';
import './App.css';
//import Login from './Container/Login';
import { BrowserRouter, Route, Routes,Link} from 'react-router-dom';
//import {useAuth} from 'react-router-dom';
//import { PrivateRoute} from 'react-router-dom/lib/PrivateRoute'
//import Dashboard from './Dashboard/Dashboard';
import home from'./icons8-home-150.png'
import Hello from './Hello/Hello'
import Bill from './Bill/Bill';
import ViewDB from './ViewDB/ViewDB';
import Archive from './Archive/Archive';
import Return from './Return/Return';
import Login from './Login/Login';
import Login2 from './Login2/Login2';
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
    <div>
      <Link to="/Hello" ><img className='home-btn' src={home}/></Link>
    </div>
    <Routes>
    <Route exact path="/" forceRefresh={true} element={<Hero/>}/>
    <Route exact path="Hello" element={<Hello/>}/>
    <Route path="Bill" element={<Bill/>}/>
    <Route path="Login" element={<Login/>}/>
    <Route path="Login2" element={<Login2/>}/>
    <Route path="ViewDB" element={<ViewDB/>}/>
    <Route path="Archive" element={<Archive/>}/>
    <Route path="Return" element={<Return/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;