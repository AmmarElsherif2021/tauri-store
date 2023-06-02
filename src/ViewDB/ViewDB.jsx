import React from "react";
import './ViewDB.css'
import { useState, useEffect,createContext,useContext } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import {Navigate} from 'react-router-dom'
import { db } from "./Carpets";
import AddCarpet from "./AddCarpet";
//import minus from './minus.png'
import avatar from './column.png'
import Login from '../Login/Login';

export default function ViewDB() {

//Auth------------------------------
const AuthContext = createContext(null);

const useAuth = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return {
    isAuthenticated,
  };
};

    const data = useLiveQuery(() => db.carpets.toArray(), []);
    
   
     
    function handleDelete(){
      db.delete().then(() => {
        console.log('Database deleted successfully');
      }).catch((err) => {
        console.log('Error deleting database:', err);
      });
    } 
    // const isAuthenticated =useContext(AuthContext);
    // if (!isAuthenticated) {
    //   return (<div><Login/></div>)
    // } else {
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
              <p className='cell txt-cell table-header'>النوع</p>
              <p className='cell table-header'>مساحة</p>
              <p className='cell table-header'>السعر</p>
              <p className='cell table-header'>الكمية</p>
              <p className="minus-btn table-header"></p>
            </div>
            {data?.map(carpet => (
              <div className='item' key={carpet.id}>
                <p className='cell txt-cell'>{carpet.model}</p>
                <p className='cell'>{carpet.type}</p>
                <p className='cell'>{Number(carpet.W * carpet.L * 0.0001).toFixed(2)}</p>
                <p className='cell'>{Number(carpet.price_m*carpet.W * carpet.L * 0.0001).toFixed(0)}</p>
                <p className='cell'>{carpet.qty}</p>
                <button className='minus-btn' onClick={() => db.carpets.delete(carpet.id)}>-</button>
              </div>
            ))}
          </div>
        </div>
      );
    }
          
 // }
  //<button onClick={()=>db.delete().then(() => {
  //  console.log('Database successfully deleted');
 // })}>delete db</button>