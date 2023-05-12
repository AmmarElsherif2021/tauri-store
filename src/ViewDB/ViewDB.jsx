import React from "react";
import './ViewDB.css'
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "./Carpets";
import AddCarpet from "./AddCarpet";
import minus from './minus.png'
import avatar from './column.png'
export default function ViewDB() {
    const data = useLiveQuery(() => db.carpets.toArray(), []);
    
    if (!data){ return <div>Loading...</div>}
     
    function handleDelete(){
      db.delete().then(() => {
        console.log('Database deleted successfully');
      }).catch((err) => {
        console.log('Error deleting database:', err);
      });
    } 
    return (
      <div className="view-db">
    <div className="avatar"><img src={avatar} className="avatar-img"/></div>
    <br/>
    <div className='add-carpet' >
    <AddCarpet/>
    </div>
    <div className="table">
    <div className='item table-header'>
    
     <p className='cell txt-cell table-header'>موديل</p>
     <p className='cell table-header'>مساحة</p>
     <p className='cell table-header'>السعر</p>
     <p className='cell table-header'>الكمية</p>
     <p className="minus-btn table-header"></p>
    </div>
    {data?.map(carpet => <div className='item' key={carpet.id}>
    
     <p className='cell txt-cell'>{carpet.model}</p>
     <p className='cell'>{carpet.W*carpet.L*0.0001}</p>
     <p className='cell'>{carpet.t_price}</p>
     <p className='cell'>{carpet.qty}</p>
     <button className='minus-btn' onClick={()=>db.carpets.delete(carpet.id)}>-</button>
    </div>)}
    <button onClick={()=>db.delete().then(() => {
      console.log('Database successfully deleted');
  })}>delete db</button>
    </div>
    </div>)      
  }