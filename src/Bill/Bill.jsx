import React, { useEffect } from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../ViewDB/Carpets";
import { archiveDB } from "../Archive/ArchDB";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import validator from 'validator';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import './bill.css'
import Print from './Print';
//import Select  from './Select'
//import Item from "./Item";

/*
What to do ?

2-adjust and validate inputs: phone and history and others
3-adjust id of bill
4-test archive
5- css fix up
6- investigate building app

*/

export default function Bill(){
//The final bill object:
const [name,setName]=useState('');
const [phone,setPhone]=useState('');
const [history,setHistory]=useState('');
const [total,setTotal]=useState(0);
const [addedCarpets,setAddedCarpets]=useState([])
//items 
async function addBill(event) {
  event.preventDefault()
  try {

    // Add the new Carpet!
    const id = await archiveDB.bills.add({
      name,phone,history,total,addedCarpets

    });
    setName('');
    setPhone('');
    setHistory('');
    setTotal(0);
    setAddedCarpets([]);
    
    
  } catch (error) {
    setStatus(`Failed to add ${name} bill, ${error}`);
  }
}  
//back ----------------------------------------------------------------------------------------
//DB 
const data = useLiveQuery(() => db.carpets.toArray(),[]);
   
//States needed in your bill:
    //carpets
    const [items,setItems]=useState([])
    const [carpets,setCarpets]=useState([])
    const Carpet=(props)=>(
      <tr className="add">
        <td>{props.val.model}</td>
        <td>{props.val.reqQty}</td>
        <td>{props.val.W}</td>
        <td>{props.val.type=='r'?props.val.reqLen:props.val.L}</td>
        <td>{props.val.t_price}</td>
      
      </tr>                        
    )
    
  
    //quntity of picked value
    const [qty,setQty]=useState(1)
    
    //error
    const[error,setError]=useState('')
    const Error=()=>(
      <div><small>{error}</small></div>
    )
    //clear Autocomplete after adding
      const [value, setValue] = useState(null);
      const [reqLen,setReqLen]=useState(0)
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
              setQty(1)
            };
            
            // Adding to bill
            function handleAdd(){

                if(value){
                  setCarpets((prevCarpets)=>[...prevCarpets,<Carpet val={value}/>])
                  setQty(1)
                  setError(()=>'')
                  setItems((prevItems)=>prevItems.filter(item => item.id !== value.id))
                  setItems((prevItems)=>[...prevItems,value])
                  handleClear()
                  
                };
            }

          //handle Quantity
          function handleValueQty(e){
            
              if(value){
                
                    if(e.target.value<=Number(value.qty)){
                      setQty(()=>Number(e.target.value))
                      setValue((prevValue)=>({
                        ...prevValue,
                        reqQty:Number(e.target.value)}))
                  }else{
                    setError(()=>'تجاوزت الكمية المتاحة')
                    handleClear()
                  }
              
            }
          }

          //handle trimming Roll
          function handleTrim(e){
            if(value && value.type=='r'){
              if(e.target.value <= value.L){
                setValue(
                  (prevValue)=>({
                    ...prevValue,
                    reqLen:Number(e.target.value)})
                )
                
              }else{
                setError(()=>'تجاوزت الكمية المتاحة')
                handleClear()
              }
            }
          }
          //force update
          useEffect(()=>{
            console.log('value changed')
            console.log(value)
          },[value])
          useEffect(
            ()=>console.log('some input error')
            ,[error])
      /*To do handle these cases:
      1-what if the same type recalled? 
      make original carpets tha are called and check if the called value in the original array
      DONE 
      2-Handle meters in the rolls.
      3-handle arabic print error.
      4-Handle the sum

      */ 
    
    return(
        <div className="bill-container">
       
          <div className="bill-inputs">
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
                      setValue((prevValue)=>(
                        {
                          ...prevValue,
                          qty: Number(prevValue.qty)-Number(prevValue.reqQty),
                          reqQty:1
                        }
                        )
                      )
                    }
                    else{
                      setValue(()=>({
                        ...v,
                        reqQty:1
                      }))
                    }
                    if(value && value.type=='r'){
                      setValue((prevValue)=>(
                        {
                          ...prevValue,
                          L: Number(prevValue.L)-Number(prevValue.reqLen),
                          reqLen:0
                        }
                        ))
                    }
                    setError(()=>'')
                    
                    
                    
                }}
                options={data}
                getOptionLabel={(option) =>{
                
                    return `${option.model}`
                }}
                className="auto-complete"
                sx={{ width: 700 }}
                renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
                />
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
                  
                  <p>
                  <button className="add-btn btn" onClick={handleAdd}>Add</button>
                  </p>
                    
                </div>     
          </div>
          <div className="print-area">
          <Print agent={name} phone={phone} total={77} discount={0}  carpetsQ ={carpets} />
          </div>
        </div>)
}