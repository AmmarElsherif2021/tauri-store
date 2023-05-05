import React from "react";
import { Link, Outlet } from "react-router-dom";
import './hero.css'
import avatar from './avatar.png'
export default function Hero(){
    return(
      
    <div className='intro'>
    <Link to="/Hello" >
    <h1>الذوق الرفيع</h1>
    <img src={avatar} className='avatar'/>
   </Link>
   <Outlet/>
    </div>

    )
}