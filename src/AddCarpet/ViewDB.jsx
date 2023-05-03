import React from "react";
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./Carpets";

export default function CarpetsList() {
    
    /*const [data, setData] = useState([]);

    useEffect(() => {
      db.carpets.toArray().then((result) => {
        setData(result);
      });
    }, []);*/

    const data = useLiveQuery(() => {
        return db.myDatabase.carpets.toArray()
      });
    return (<div>
       <ul>
       {data?.map(carpet => <li key={carpet.id}>
       {carpet.model}, {carpet.size} ,{t_price}
       </li>)}
       </ul>
 
       </div>)      
  }