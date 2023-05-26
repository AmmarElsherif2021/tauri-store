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
  const[returnedQty,setReturnedQty]=useState()
  const[allRetuerned,setAllRetturned]=useState([])
  const[sum,setSum]=useState(0)
  
  const data = useLiveQuery(() => db.carpets.toArray(),[]);
  function handleClear(){
    setValue()
    setAllRetturned([])
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
      if(value && value.type=='r'){
        setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(Number(x.returned)*Number(x.W)*Number(x.price_m)), 0)})
      }else{
       setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(x.returned)*Number(x.t_price), 0)})

      }}},[allRetuerned])
  useEffect(()=>value&&console.log(`returned update ${Object.keys(value)}`),[value])
  
 
  return(
    <div className='return-home'>
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
        placeholder="len"
        value={returnedQty}
        onChange={(e)=>setReturnedQty(()=>e.target.value)}
        step="1"
        />
      </p>
      :
      <p>
         كمية
        <input
        type="number"
        min="1"
        value={returnedQty}
        onChange={(e)=>setReturnedQty(()=>e.target.value)}
        placeholder="qty"
        
        />
      </p>
      }
      <button onClick={()=>{
        setValue((prev)=>({
          ...prev,
          returned:returnedQty

        }))
        
        setAllRetturned((prev)=>[...prev,value])
        if(x.type=='r'){
          setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(Number(x.returned)*Number(x.W)*Number(x.price_m)), 0)})
        }else{
         setSum(()=>{allRetuerned.reduce((acc, x) => acc + Number(x.returned)*Number(x.t_price), 0)})

        }
      }}>اضف</button>
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
      <td>{x.type=='r'? Number(x.returned)*Number(x.W)*Number(x.price_m):Number(x.returned)*Number(x.t_price)}</td>
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
     <div><h4> {sum}  اجمالي </h4></div>
     <button
     onClick={
      ()=>{
        allRetuerned.map((x)=>handleUpdate(x.id))
        handleClear()
      }
    }
     >ارجاع</button>
    </div>
    </div>
  )
}