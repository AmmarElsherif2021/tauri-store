import './addCarpet.css'
import React from 'react'
//import Carpets from './Carpets'
import { useState } from 'react';
import {db} from './Carpets';
import ViewDB from './ViewDB'
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
      setW(Number(value)) 
    }
    else if(name=='L'){
      setL(Number(value))
    }else if(name=='price_m'){
      setprice_m(Number(value))
    }
    setsize((prevS)=>prevS=W*L*0.0001)
    setT_price((prevP)=>prevP=size*price_m)
    
}
 
//--------------------------------------------------------------
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
      setStatus(`Failed to add ${model} ${error}`);
    }
  }

  return (
    <div className='add_db'>
    
    <div className='status'>
     <p>
      {status}
     </p>
    </div>

    :موديل
    <input
      type="text"
      value={model}
      onChange={ev => setmodel(ev.target.value)}
    />
    :سعر المتر
    <input
      type="number"
      value={price_m}
      name='price_m'
      onChange={handleChange}
      className='num'
    />
    
    : عرض
    <input
      type="number"
      value={W}
      name='W'
      onChange={handleChange}
      className='num'
    />
    :طول
    <input
      type="number"
      value={L}
      name='L'
      onChange={handleChange}
      className='num'
    />
      <p>{size}: مساحة</p><br/>
      
      <p>{t_price}: اجمالي السعر</p>
      
    
    <button onClick={addCarpet}>
      Add
    </button>
    <ViewDB/>
    </div>
  )
} 