/*
1-roll width:60,80,100,120,150,200.
2-lock
3-export data
4-req qty in bill problem
5-bill archive
*/ 


import React, { useEffect } from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../ViewDB/Carpets";
import { archiveDB } from "../Archive/ArchDB";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import validator from 'validator';
import { v4 as uuidv4 } from "uuid";
import './bill.css'
import Print from './Print';
import { red } from "@mui/material/colors";



/*
What to do ?
1-make custom button to excute bill
2-handle final object of bill
3-adjust id of bill
4-test archive
5- css fix up home page cards,print bill
6- investigate building app

*/

export default function Bill(){
//The final bill object:
const [name,setName]=useState('');
const [phone,setPhone]=useState('');
const [history,setHistory]=useState('');
const [total,setTotal]=useState(0);
const [addedCarpets,setAddedCarpets]=useState([]);
//items 
async function addBill(event) {
  event.preventDefault()
  try {
    
    // Add the new Carpet!
    const id = await archiveDB.bills.add({
      name,phone,history,sum,addedCarpets

    });
    console.log('sUCCCSESSSSSSSS')
    setError(()=>`bill ${name} successfully added. Got id ${id}`)
    setName('');
    setPhone('');
    setHistory('');
    setSum(0);
    setAddedCarpets([]);
    setItems([])
    
  } catch (error) {
    setError(`Failed to add ${name} bill, ${error}`);
    console.log('FAILED'+error)
  }
}  
//back ----------------------------------------------------------------------------------------
//DB 
const data = useLiveQuery(() => db.carpets.toArray(),[]);
   
//States needed in your bill:
    //carpets
    const [items,setItems]=useState([])
    const [carpets,setCarpets]=useState([])
    function returnBack(bid){
      setItems((prevItems)=>prevItems.filter(item => item.id !== bid)) 
      setCarpets((prevItems)=>prevItems.filter(item => item.props.val.id !== bid))
      handleClear() 
    }
    const Carpet=(props)=>(
      <tr className="added" key={props.val.id}>
        <td>{props.val.model}</td>
        <td>{props.val.reqQty}</td>
        <td>{props.val.W}</td>
        <td>{props.val.type=='r'?props.val.reqLen:props.val.L
      }</td>
        <td>{props.val.t_price}</td>
        <td><button className="del-btn" onClick={()=>returnBack(props.val.id)}><h3>-</h3></button></td>
      
      </tr>                        
    )
    
  
    //quntity of picked value
    const [qty,setQty]=useState(1)
    
    //error
    const[error,setError]=useState('')
    const Error=()=>(
      <div className='error'><span><small>{error}</small></span></div>
    )
    //clear Autocomplete after adding
      const [value, setValue] = useState(null);
      const [sum,setSum]=useState(0);
      const [key, setKey] = useState(0);
    

            //Validate inputs
            const validatePhoneNumber = (number) => {
              const isValidPhoneNumber = validator.isMobilePhone(number, ['ar-EG']);
              return isValidPhoneNumber;
            }
              

            // Handle clear
            const handleClear = () => {
              setValue(null);
              setKey((prevKey) => prevKey + 1);
              //setQty(1)
              setQtyTemp(0)
            };
            
            // Adding to bill
            function handleAdd(){
                if(value &&value.type !='r' && value.reqQty<=value.qty){
                  setItems((prevItems)=>prevItems.filter((x)=>x.id!=value.id))
                  setValue((prevValue)=>({
                    ...prevValue,
                    t_price:Number(prevValue.W)*Number(prevValue.L)*0.0001*Number(prevValue.reqQty)*Number(prevValue.price_m),
                    }))
                  setCarpets((prevCarpets)=>prevCarpets.filter((x)=>x.key!=value.id))
                  setCarpets((prevCarpets)=>[...prevCarpets,<Carpet key={value.id} val={value} />])
                  //setSum(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
                  
                  setQty(1)
                  setError(()=>'')
                  //setItems((prevItems)=>prevItems.filter(item => item.id !== value.id))
                  
                  setItems((prevItems)=>[...prevItems,value])
                  console.log(items)
                  handleClear()
                  
                }else if(value && value.type=='r' && value.reqLen<=value.L){
                  setItems((prevItems)=>prevItems.filter((x)=>x.id!=value.id))
                  setValue((prevValue)=>({
                    ...prevValue,
                    reqLen:Number(prevValue.reqLen)+qtyTemp,
                    t_price:(Number(prevValue.W)*0.0001*(Number(prevValue.reqLen))*Number(prevValue.price_m)).toFixed(0),
                    }))
                  setCarpets((prevCarpets)=>prevCarpets.filter((x)=>x.key!=value.id))
                  setCarpets((prevCarpets)=>[...prevCarpets,<Carpet key={value.id} val={value} />])
                  //setSum(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
                  
                  
                  setError(()=>'')
                  //setItems((prevItems)=>prevItems.filter(item => item.id !== value.id))
                  
                  setItems((prevItems)=>[...prevItems,value])
                  console.log(items)
                  handleClear()
                }else{
                  setError('  --تجاوزت الكمية المتاحة')
                };
            }
          //Temp qty handler
          const [qtyTemp,setQtyTemp]=useState(0)
          useEffect(()=>{
            console.log('qty handled')
          },[qtyTemp])
          //handle Quantity
          function handleValueQty(e){
            
              if(value ){
                    if(Number(e.target.value)+qtyTemp<=Number(value.qty)){ //SOME ERROR AQUIRED ADDING ONE

                      setQty(()=>Number(e.target.value))
                      setValue((prevValue)=>({
                        ...prevValue,
                        t_price:Number(prevValue.W)*Number(prevValue.L)*0.0001*(Number(e.target.value)+qtyTemp)*Number(prevValue.price_m),
                        reqQty:Number(e.target.value)+qtyTemp}))       
                  }else{
                    setError(()=>'تجاوزت الكمية المتاحة   ')
                    handleClear()
                  }
                }
            }
          
          //handle trimming Roll
           function handleTrim(e){
            e.preventDefault()
            if(value && value.type=='r'){
              if(e.target.value <= value.L-qtyTemp){
                setValue(
                  (prevValue)=>({
                    ...prevValue,
                    reqLen:Number(e.target.value),
                    t_price:(Number(e.target.value))*prevValue.W*prevValue.price_m*.0001
                  })
                    
                )
                
              }else{
                setError(()=>'تجاوزت الكمية المتاحة')
                handleClear()
              }
            }
          }
          //force update
          useEffect(()=>setAddedCarpets(()=>{
            items.map((item)=>{
              if(item.type!='r'){
                return {
                  'id':item.id,
                  'W':item.W,
                  'L':item.L,
                  'model':item.model,
                  'price_m':item.price_m,
                  'reqQty':item.reqQty,
                  'reqLen':item.L,
                  't_price':item.t_price,
                  'type':item.type}
              }else{return {
                'id':item.id,
                  'W':item.W,
                  'L':item.L,
                  'model':item.model,
                  'price_m':item.price_m,
                  'reqQty':item.reqQty,
                  'reqLen':item.reqLen,
                  't_price':item.t_price,
                  'type':item.type
              }}})
          })
            ,[addedCarpets])
            useEffect(()=>
            setHistory(()=>{
              const date = new Date();
              const day = date.getDate();
              const hour = date.getHours();
              const minute = date.getMinutes();
              return`${day}-${hour}-${minute}`
            })
            ,[addedCarpets])
          useEffect(()=>{
            console.log('value changed')
            console.log(value)
           },[value])
          useEffect(
            ()=>console.log('some input error')
            ,[error])
            useEffect(()=>
            setSum(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
            ,[items])
        //     useEffect(()=>{
        //      if(value && value.type != 'r'){setValue(
        //     (prevValue)=>({
        //       ...prevValue,
        //       t_price:Number(prevValue.W)*Number(prevValue.L)*0.0001*Number(prevValue.reqQty)*Number(prevValue.price_m),
        //     }
        //     )
        //     )}else if(value && value.type == 'r'){
        //       setValue(
        //         (prevValue)=>({
        //           ...prevValue,
        //           t_price:Number(prevValue.W)*Number(prevValue.reqLen)*0.0001*Number(prevValue.price_m),
            
        //         }
        //         )
        //         )
        //     }
        //  }
        //   ,[items])
            
         useEffect(()=>console.log('qty readded'),[qtyTemp])
    return(
        <div className="bill-container">
          <div className='bill-title container-row'><h1>فاتورة جديدة</h1>
          <button className='save-btn' onClick={()=>addBill}>حفظ</button></div>
          
          <div className="bill-inputs container-row">
                <div className='input-row'>
                <Autocomplete
                disablePortal={true}
                id="dataList"
                key={key}
                value={value}
                onChange={(e, v) => {
                  let result=items.find(x => x.id === v.id)
                    if(result){
                      
                      setValue(result)
                      if(result.type!='r'){
                            setQtyTemp(()=>Number(result.reqQty))
                            setValue((prevValue)=>(
                            {
                              ...prevValue,
                              //qty: Number(prevValue.qty)-Number(prevValue.reqQty),
                              reqQty:1+prevValue.reqQty,
                              t_price:Number(prevValue.t_price)+Number(prevValue.W)*Number(prevValue.L)*0.0001*Number(prevValue.reqQty)*Number(prevValue.price_m)
                            }
                          )
                        )
                      }else{
                        setQtyTemp(()=>Number(result.reqLen))
                        setValue((prevValue)=>(
                          {
                            ...prevValue,
                            reqQty:0,
                            //qty: Number(prevValue.qty)-Number(prevValue.reqQty),
                            //reqLen:prevValue.reqLen,
                            t_price:Number(prevValue.W)*Number(qtyTemp)*0.0001*Number(prevValue.price_m),
                            reqLen:prevValue.reqLen,
                            
                          }
                         ))
                      }
                    }
                    else{
                      setValue(()=>({
                        ...v,
                        reqQty:1
                      }))
                    }
                    if(value&& value.type=='r'){
                      setValue((prevValue)=>(
                        {
                          ...prevValue,
                         
                          reqLen:0,
                          t_price:0,
                          reqQty:0
                        }
                        ))
                    }
                    setError(()=>'')     
                }}
                options={data}
                getOptionLabel={(option) =>{
                
                    return `${option.model},${option.W},${option.L}`
                }}
                className="auto-complete"
                sx={{ width: 700 }}
                renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
                />
                
                <button className="add-btn btn" onClick={handleAdd}>Add</button>
                  
                </div>
                
                
                <div className='input-row'>
                {
                  value && value.type=='r'?
                  <p>
                    طول
                    <input
                    type="number"
                    min="0"
                    placeholder="len"
                    value={value.reqLen}
                    onChange={handleTrim}
                    step="1"
                    />
                  </p>
                  :
                  <p>
                     كمية
                    <input
                    type="number"
                    min="1"
                    
                    placeholder="qty"
                    value={qty}
                    onChange={handleValueQty}
                    />
                  </p>
                  }
                  
                  <p><Error/></p>
                  <p>
                  <input
                  type="text"
                  placeholder="name"
                  onChange={(e)=>setName(()=>e.target.value)}
                  />
                  </p>
                  <p>
                  <input
                  type="tel"
                  placeholder="phone"
                  onChange={(e)=>{
                    if(validatePhoneNumber(e.target.value)==false)
                    { setError(()=>'رقم الموبايل غير صحيح')}else{
                      setError('')
                    }
                    setPhone(String(e.target.value))}
                      }
                   /> 
                  </p>  
                </div>     
          </div>
          <div  className="print-area container-row">
          <Print key={()=>uuidv4()} agent={name} phone={phone} total={sum}  carpetsQ ={carpets} />
          </div>
        </div>)
}