import './addCarpet.css'
import React from 'react'
import Carpets from './Carpets'
import { useState } from 'react';
import Dexie from 'dexie';
const db = new Dexie('myDatabase');
db.version(1).stores({
  carpet: '++id, model, price_m ,W,L,size,t_price', // Primary key and indexed props
});
export default function AddCarpet({defaultPrice_m} = {defaultPrice_m: 0}){
    
  const [model, setmodel] = useState("");
  const [price_m, setprice_m] = useState(defaultPrice_m);
  const [W, setW] = useState(0);
  const [L, setL] = useState(0);
  const [size, setsize] = useState(0);
  const [t_price, setT_price] = useState(0);
  const [status, setStatus] = useState("");
  //-changing function-------------------
   
  function handleChange(event) {
    const {name, value} = event.target
    if(name=='W'){
      setW((prevW)=>prevW=value) 
    }
    else if(name=='L'){
      setL((prevL)=>prevL=value)
    }else if(name=='price_m'){
      setprice_m((prevP)=>prevP=value)
    }
    setsize((prevS)=>prevS=W*L)
    setT_price((prevP)=>prevP=size*price_m)
    
}
 
//----------------------------------------
  async function addCarpet() {
    try {

      // Add the new Carpet!
      const id = await db.carpet.add({
        model,
        price_m,
        W,
        L,
        t_price

      });

      setStatus(`Carpet ${model} successfully added. Got id ${id}`);
      setmodel("");
      setprice_m(0);
      setW(0.0);
      setL(0.0);
      setsize(0.0);
      setT_price(0);
      
    } catch (error) {
      setStatus(`Failed to add ${model}: ${error}`);
    }
  }

  return (
    <div>
    <p>
      {status}
    </p>
    
    <input
      type="text"
      value={model}
      onChange={ev => setmodel(ev.target.value)}
    />موديل:
    
    <input
      type="number"
      value={price_m}
      name='price_m'
      onChange={handleChange}
    />:سعر المتر
    
    <input
      type="float"
      value={W*1.0}
      name='W'
      onChange={handleChange}
    /> : عرض
    
    <input
      type="float"
      value={L*1.0}
      name='L'
      onChange={handleChange}
    />:طول
      <p>{size}: مساحة</p>
      <p>{t_price}: اجمالي السعر</p>
      
    
    <button onClick={addCarpet}>
      Add
    </button>
    </div>
  )
} 