import React, { useState } from "react";
import './hello.css'
import Card from "../layouts/Card";
//import avatar from '../assets/avatar.png'
import addBill from '../assets/add-bill.png'
import history from '../assets/history.png'
import r from '../assets/R.png'
import addDatabase from '../assets/add-database.png'

import { Link, Outlet } from "react-router-dom"
import Hero from "./Hero/Hero";
export default function Hello(){
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  const data=[
    {
        id: 1,
        title: "New bill",
        path:'/Bill',
        coverImg: addBill,
        sub:'فاتورة جديدة'
        
    },
    {
        id: 2,
        title: "Add new carpet",
        path:'/Login',
        coverImg: addDatabase,
        sub:'صنف جديد'
        
    },
    {
        id: 3,
        title: "Get history",
        path: '/Archive',
        coverImg: history,
        sub:'فواتير سابقة '
        
    }
    ,
    {
      id: 4,
      title: "Return",
      path: '/Login2',
      coverImg: r,
      sub:'مرتجع'
      
  }
  ]
  const cards=data.map((x)=>{
    return(
       <Link to={x.path}>
       <div className='card-item'>
       <Card key={x.id} urlPath={x.path} imgPath={x.coverImg}  />
       <h3>{x.sub}</h3>
       </div>
       </Link>
        
        )
})

  return (
    
    <div className="hello-container">
    <div className="hello-row hero-row"> <Hero/></div>
    <div className="hello-row">
      {cards}
    </div>

    </div>
  );
}