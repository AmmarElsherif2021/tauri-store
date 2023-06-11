import React, { useEffect } from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useLocation } from "react-router-dom";
import { db } from "../ViewDB/Carpets";
import './return.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import validator from 'validator';
export default function Return(){
  const[key,setKey]=useState()
  const[value,setValue]=useState()
  const[returnedQty,setReturnedQty]=useState(1)
  const[allRetuerned,setAllRetturned]=useState([])
  const[sum,setSum]=useState(0)
  useEffect(()=>setValue((prevValue)=>({
    ...prevValue,
    returned:returnedQty
  })),[value])
  
  const data = useLiveQuery(() => db.carpets.toArray(),[]);
  function handleClear(){
    setValue()
    setAllRetturned([])
    setReturnedQty(1)
    setSum(0)
    setKey(0)
  }
  async function handleUpdate(id) {
    try {
      await db.carpets
        .where("id")
        .equals(id)
        .modify(async (carpet) => {
          const added = data.find((item )=> item.id === carpet.id);
          console.log(`handleUpdate called ${carpet.model}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
          if (carpet.type != "r") {
            carpet.qty=Number(carpet.qty)+Number(returnedQty)
            
            
          } else {
            carpet.L = Number(carpet.L)+ Number(returnedQty);
            carpet.size=(Number(carpet.L)*Number(carpet.W)*0.0001).toFixed(2)
            carpet.t_price=(Number(carpet.price_m)*Number(carpet.size)).toFixed(2)
          }
        });
      //console.log(`Carpet with id ${id} had their qty/len decremented`);
    } catch (err) {
      console.error(`An error occurred while updating carpet with id ${id}: ${err}`);
    }
  }
  useEffect(()=>console.log('update reqs'),[returnedQty])
  useEffect(()=>console.log('update reqs'),[allRetuerned])
  useEffect(()=>console.log(` ---> sum ${sum}`),[sum])
  useEffect(()=>console.log(` ---> sum ${sum}`),[allRetuerned])
  useEffect(()=>console.log(` ---> sum ${sum}`),[allRetuerned,sum])
  useEffect(()=>console.log('value update'),[value])
  useEffect(()=>value&&console.log(`returned update ${Object.keys(value)},,,,${value.returned}`),[returnedQty])
  useEffect(()=>setValue((prev)=>({
    ...prev,
    returned:returnedQty
  })),[returnedQty])
  //useEffect(()=>allRetuerned && setSum(()=>{allRetuerned.reduce((acc, item) => acc + Number(item.t_price), 0)}),[allRetuerned])
  useEffect(()=>{
    console.log('sum all !!!!!!!!!!')
    if(allRetuerned){
      let acc=0;
      for(let i=0;i<allRetuerned.length;i++){
        if(allRetuerned[i] && allRetuerned[i].type=='r'){
          acc+=allRetuerned[i].returned*allRetuerned[i].price_m*allRetuerned[i].W*0.0001
        }else{
          acc+=allRetuerned[i].returned*allRetuerned[i].t_price
        }
        setSum(()=>acc) 
      }
      }},[allRetuerned])
  useEffect(()=>value&&console.log(`returned update ${Object.keys(value)}`),[value])
  useEffect(()=>console.log(`returned update `),[returnedQty])
  
 
  return(
    <div className='return-home'>
    <h1>اضافة مرتجع</h1>
    <div className='return-header'>
    <Autocomplete
    disablePortal={true}
    id="returnList"
    options={data}
    key={key}
    value={value}
    onChange={(e, v) => {
      let result=data.find(x => x.id ===v.id)
        if(result){
          setValue(result)}}}
    getOptionLabel={(option) =>{
    
        return `${option.model}`
    }
    }
    className="auto-complete"
    sx={{ width: 700 }}
    renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
    />
    {
      value && value.type=='r'?
      <p>
        طول
        <input
        type="number"
        min="0"
        placeholder="1"
        value={returnedQty}
        onChange={(e)=>setReturnedQty(()=>e.target.value)}
        step="1"
        />
        <small>سم</small>
      </p>
      :
      <p>
         عدد
        <input
        type="number"
        min="1"
        value={returnedQty}
        onChange={(e)=>setReturnedQty(()=>Number(e.target.value))}
        placeholder="1"
        
        />
      </p>
      }
      <button onClick={()=>{
       if(value.model && returnedQty){ 
        
        setValue((prev)=>({
          ...prev,
          returned:returnedQty

        }))
        
        if(value.returned){setAllRetturned((prev)=>[...prev,value])}else{
          setReturnedQty(1)
          setValue((prev)=>({
            ...prev,
            returned:returnedQty
          }))

        }
        if(value.type=='r'){
          setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(Number(x.returned)*Number(x.W)*Number(x.price_m)), 0)})
        }else{
         setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(x.returned)*Number(x.t_price), 0)})

        }}
      }}
      className='add-return-btn'
      >اضف</button>
    </div >
    <div className="return-body">
    <hr/>
    <table className="returned-table">
    <thead>
    <tr>
    <th>موديل</th>
    <th>مرتجع</th>
    <th>سعر</th>
    </tr>
    </thead>
    <tbody>
    {allRetuerned.map((x)=>{return(
      <tr>
      <td>{x.model}</td>
      <td>{x.returned}</td>
      <td>{x.type=='r'?Number( 0.0001*Number(x.returned)*Number(x.W)*Number(x.price_m)).toFixed(0):Number(Number(x.returned)*Number(x.t_price)).toFixed(0)}</td>
      <td><button className="del-btn" onClick={()=>{
        
        setAllRetturned((prev)=>prev.filter(c=>c.id!=x.id))
        
        if(x.type=='r'){
          setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(Number(x.returned)*Number(x.W)*Number(x.price_m)), 0)})
        }else{
         setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(x.returned)*Number(x.t_price), 0)})

        }
        
        
      }}><h3>-</h3></button></td>
      </tr>
      )})}
      
    </tbody>
    </table>
    <hr/>
     <div><h4> {sum}  اجمالي </h4></div>
     <button
     onClick={
      ()=>{
        allRetuerned.map((x)=>handleUpdate(x.id))
        handleClear()
      }
    }
    className='return-btn'
     >ارجاع</button>
    </div>
    </div>
  )
}