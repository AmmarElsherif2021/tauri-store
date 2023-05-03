import React from "react";
import './ViewDB.css'
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./Carpets";
import AddCarpet from "./AddCarpet";
export default function CarpetsList() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
      db.carpets.toArray().then((result) => {
        setData(result);
      });
    }, []);

    /*
    const data = useLiveQuery(() => {
        return db.carpets.toArray()
      });
      */
    return (<div className="view-db">
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