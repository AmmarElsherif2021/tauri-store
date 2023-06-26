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
    //search
const [searchTerm, setSearchTerm] = useState('');
const filteredData = data?.filter((carpet) =>
    carpet.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );
   
     
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
          <input
        className="search-bill"
        type="text"
        placeholder="ابحث باسم السجادة"
        onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='add-carpet' >
            <AddCarpet/>
          </div>
          <table className="table">
            <thead className='item table-header'>
              <th className='cell txt-cell table-header'>موديل</th>
              <th className='cell txt-cell table-header'>النوع</th>
              <th className='cell table-header'>مساحة</th>
              <th className='cell table-header'>السعر</th>
              <th className='cell table-header'>الكمية</th>
              <th className="minus-btn table-header"></th>
            </thead>
            <tbody>
            {filteredData?.map(carpet => (
              <tr className='item' key={carpet.id}>
                <td className='cell txt-cell'>{carpet.model}</td>
                <td className='cell'>{carpet.type}</td>
                <td className='cell'>{Number(carpet.W * carpet.L * 0.0001).toFixed(2)}</td>
                <td className='cell'>{Number(carpet.price_m*carpet.W * carpet.L * 0.0001).toFixed(0)}</td>
                <td className='cell'>{carpet.qty}</td>
                <td>
                <button className='minus-btn' onClick={() => db.carpets.delete(carpet.id)}>-</button>
                </td>
                
              </tr>
            ))
          }
            </tbody>
            
          </table>
        </div>
      );
    }
          
 // }
  //<button onClick={()=>db.delete().then(() => {
  //  console.log('Database successfully deleted');
 // })}>delete db</button>