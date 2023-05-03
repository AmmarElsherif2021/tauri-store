import React, { useState } from "react";
import Card from "../layouts/Card";
//import avatar from '../assets/avatar.png'
import addBill from '../assets/add-bill.png'
import history from '../assets/history.png'
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
        
    },
    {
        id: 2,
        title: "Add new carpet",
        path:'/ViewDB',
        coverImg: addDatabase,
        
    },
    {
        id: 3,
        title: "Get history",
        path: '/',
        coverImg: history,
        
    }
  ]
  const cards=data.map((x)=>{
    return(
       <Link className="card-item" to={x.path}>
       <Card urlPath={x.path} imgPath={x.coverImg} />
       </Link>
        
        )
})

 


  return (
    
    <div className="container">
    
    <Hero/>

    <div className="row">
      {cards}
    </div>

    <p>.......</p>

    <div className="row">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
    </div>

    <p>{greetMsg}</p>
    </div>
    
    
  );
}