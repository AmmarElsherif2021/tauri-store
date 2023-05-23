import './addCarpet.css'
import React from 'react'
//import Carpets from './Carpets'
import { useState,useEffect } from 'react';
import {db} from './Carpets';
//import ViewDB from './ViewDB'
export default function AddCarpet(){
  

  //===============================================================================
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [model, setmodel] = useState("");
  const [price_m, setprice_m] = useState(0);
  const [W, setW] = useState(0);
  const [L, setL] = useState(0);
  const [size, setsize] = useState(0);
  const [t_price, setT_price] = useState(0);
  const [qty, setQty] = useState(1);
  const [type,setType]= useState('c')
  const [status, setStatus] = useState("");
  //-changing function-------------------
   
  function handleChange(event) {
    const {name, value} = event.target
    if(name=='W'){
      setW(Number(value)) 
      
    }
    if(name==='L'){
      setL(Number(value))
      setsize((W*L*0.0001).toFixed(2));
      setT_price(()=>(size*price_m).toFixed(0))
    }
    if(name==='price_m'){
      setprice_m(Number(value))
    }
    if(name==='qty'){
      setQty(Number(value))
    }
   
}
//force update
  useEffect(()=>{
    setT_price(()=>(size*price_m).toFixed(0))},[price_m]);
  useEffect(()=>{
    setsize((W*L*0.0001).toFixed(2))
    setT_price(()=>(size*price_m).toFixed(0))
  },[L]);
  useEffect(()=>{
    setsize((W*L*0.0001).toFixed(2))
    setT_price(()=>(size*price_m).toFixed(0))
  },[W]);
  useEffect(()=>{
    setT_price(()=>(size*price_m).toFixed(0))
  },[size]);
  
// hANDLE TYPE OF CARPET
function handleType(e){
  
    setType(e.target.value)
    if(type=='o'){
      setW(100);
      setL(100);
      setsize((W*L*0.0001).toFixed(2))
      setT_price(()=>(size*price_m).toFixed(0))
      
    }
  
}
useEffect(()=>{
  setW(100);
  setL(100);
  setT_price(()=>(0.0001*price_m).toFixed(0))
 },[type]);
 
//--------------------------------------------------------------

  async function addCarpet(event) {
    event.preventDefault()
    try {

      // Add the new Carpet!
      const id = await db.carpets.add({
        model,
        price_m,
        W,
        L,
        t_price,
        qty,
        type

      });

      setStatus(`Carpet ${model} successfully added. Got id ${id}`);
      setType('c')
      setmodel("");
      setprice_m(0);
      setW(0.0);
      setL(0.0);
      setsize(0.0);
      setT_price(0);
      setQty(1)
      
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
    <p>
    موديل
    <input
      type="text"
      value={model}
      onChange={(ev) =>{ 
        setmodel(ev.target.value)}}
    />
    </p>
  
    
     {type!='o'?<p>
    سعر المتر
    <input
      type="number"
      value={price_m}
      name='price_m'
      onChange={
        handleChange
    }
      className='num'
    />
    </p>:
    <p>
    سعر 
    <input
      type="number"
      value={price_m}
      name='price_m'
      onChange={handleChange}
      className='num'
    />
    </p>
  }
   {type!='o'?
   <p>
   <p>
   عرض
  <input
    type="number"
    value={W}
    name='W'
    onChange={handleChange}
    className='num'
  />
  </p>
  
  <p>
  طول
  <input
    type="number"
    value={L}
    name='L'
    onChange={handleChange}
    className='num'
  />
  </p>
   </p>
   :
   <p></p>
  } 
 
    <p>
    الكمية
    <input
      type="number"
      value={qty}
      name='qty'
      onChange={(e)=>{
        setQty(()=>e.target.value);
      }}
      className='num'
    />
    </p>
    <p>
    النوع
    <label htmlFor="my-select">اختر النوع</label>
      <select id="my-select" onChange={handleType}
         value={type}>
        <option value="c">سجاد</option>
        <option value="r">رول</option>
        <option value="o">غير ذلك</option>
      </select>

    </p>
    
      <p>{size} مساحة</p><br/>
      
      <p>{t_price} اجمالي السعر</p>
      
    
    <button onClick={addCarpet} className='btn'>
      أضف
    </button>
   
    </div>
  )
} 