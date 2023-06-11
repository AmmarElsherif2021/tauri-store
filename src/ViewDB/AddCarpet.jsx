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

  const[errorClass,setErrorClass]=useState('status')
  //-changing function-------------------
   
  function handleChange(event) {
    const {name, value} = event.target
    if(name==='W'){
      setW(Number(value).toFixed(2)) 
      setsize((W*L*0.0001).toFixed(2));
      setT_price(()=>(size*price_m).toFixed(0))
      
    }
    if(name==='L'){
      setL(Number(value))
      setsize((W*L*0.0001).toFixed(2));
      setT_price(()=>(size*price_m).toFixed(0))
    }
    if(name==='price_m'){
      setprice_m(Number(value).toFixed(0))
    }
    if(name==='qty'){
      setQty(Number(value))
    }
   
}
//force update
useEffect(()=>console.log('W changed'),[W])
useEffect(()=>console.log('L changed'),[L])
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
 useEffect(()=>console.log('error alter'),[errorClass])
//--------------------------------------------------------------

  async function addCarpet(event) {
   // event.preventDefault()
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
      setErrorClass('status-r')
    }
  }

  return (
    <div className='add_db'>
    
    <div className={errorClass}>
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
      min='0'
      onChange={
        handleChange
    }
      className='num'
      placeholder='جنيه'
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
      min='0'
      placeholder='جنيه'
    />
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
      min='0'
      placeholder='وحدة'
    />
    </p>
    </p>
    
  }
   {type!='o' &&
   
   <p>
   { type!='r' &&
   <p>
   <p className='o'>
   عرض
  <input
    type="number"
    value={W}
    name='W'
    onChange={handleChange}
    className='num'
    min='0'
    placeholder='سم'
  />
  <small>سم</small>
  </p>
  
  <p>
  طول
  <input
    type="number"
    value={L}
    name='L'
    onChange={handleChange}
    className='num'
    min='0'
    placeholder='سم'
  />
  <small>سم</small>
  </p>
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
    min='0'
    placeholder='وحدة'
  />
  </p>
   </p>
}
   
  {type=='r' &&
  <p>
  <p className='o'>
   
  عرض
  <select onChange={handleChange} name='W' value={W}>
  <option value="0">0</option>
  <option value="60">60</option>
  <option value="80">80</option>
  <option value="100">100 </option>
  <option value="120">120</option>
  <option value="150">150</option>
  <option value="200">200</option>
  </select>
  <p>{W}</p>
  <small>سم</small>
 </p>
 
 <p>
 طول
 <input
   type="number"
   value={L}
   name='L'
   onChange={handleChange}
   className='num'
   min='0'
   placeholder='سم'
 />
 <small>سم</small>
 </p>
  </p>
  }
  </p>
  } 
 

    <p>
   
    <label htmlFor="my-select">اختر النوع</label>
      <select id="my-select" onChange={handleType}
         value={type}>
        <option value="c">سجاد</option>
        <option value="r">رول</option>
        <option value="o">غير ذلك</option>
      </select>

    </p>
    
      <p>{size} مساحة</p>
      <small>2م</small>
      <br/>
      
      <p>{t_price} اجمالي السعر</p>
      <small>جنيه</small>
      
      
    
    <button onClick={(e)=>{if(model){addCarpet(e.target.value)}}} className='btn'>
      أضف
    </button>
   
    </div>
  )
} 