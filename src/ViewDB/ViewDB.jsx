import React from "react";
import './ViewDB.css'
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "./Carpets";
import AddCarpet from "./AddCarpet";
import avatar from './column.png'
export default function ViewDB() {
    
   /* const [data, setData] = useState([]);

    useEffect(() => {
      db.carpets.toArray().then((result) => {
        setData(result);
      });
    }, []);*/
    const data = useLiveQuery(() => db.carpets.toArray(), []);
    console.log(data)
    if (!data){ return <div>Loading...</div>}
     
    function handleDelete(){
      db.delete().then(() => {
        console.log('Database deleted successfully');
      }).catch((err) => {
        console.error('Error deleting database:', err);
      });
    }
    /*
    const data = useLiveQuery(() => {
        return db.carpets.toArray()
      });
       <button onClick={handleDelete}>Del</button>
      
      */
      
    return (<div className="view-db">
    <div className="avatar"><img src={avatar} className="avatar-img"/></div>
    <br/>
    <div class='add-carpet' >
    <AddCarpet/>
    </div>
    <ul>
    {data?.map(carpet => <li key={carpet.id}>
    {carpet.model}, {carpet.size} ,{t_price}
    </li>)}
    </ul>
    </div>)      
  }