import React, { useEffect } from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../ViewDB/Carpets";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import './bill.css'
import Print from './Print';
//import Select  from './Select'
//import Item from "./Item";


export default function Bill(){

    
//back ----------------------------------------------------------------------------------------
//DB 
const data = useLiveQuery(() => db.carpets.toArray(),[]);
    const handleClientPhone=(e)=>setClient((x)=>{
        return{
            ...x,
            'phone':e.target.value
        }
    })
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
    //customer data
      const [client,setClient]=useState({
        'name':'',
        'phone':''
      })
    //quntity of picked value
    const [qty,setQty]=useState(1)
    
    //error
    const[error,setError]=useState('')
    const Error=()=>(
      <div><h3>{error}</h3></div>
    )
    //clear Autocomplete after adding
      const [value, setValue] = useState(null);
      const [reqLen,setReqLen]=useState(0)
      const [key, setKey] = useState(0);
    

    //Validate inputs
      const inputValidation = (e) => {
        // get value form event
        const val = e.target.value;
        // validate value
        const validatedValue = val.replace(/[^0-9]/g, '');
        return validatedValue;
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
                
                    if(e.target.value<=value.qty){
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
          },[value])
      /*To do handle these cases:
      1-what if the same type recalled? 
      make original carpets tha are called and check if the called value in the original array
      DONE 
      2-Handle meters in the rolls.
      3-handle arabic print error.
      4-Handle the sum

      */ 
    
    return(
        <div>
       
          <div className="bill-inputs">
                
             
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
                      <Error/>
                      
                       <input
                        type="text"
                        placeholder="name"
                        onChange={(e)=>setClient((x)=>{
                            return{
                                ...x,
                                'name':e.target.value
                            }
                        })}
                        />
                        
                        <input
                        type="tel"
                        
                        placeholder="phone"
                        onChange={
                            inputValidation && handleClientPhone
                            }
                      /> 
                      <button className="add-btn btn" onClick={handleAdd}>Add</button>
                       <Error/>
                <button onClick={console.log(value)}></button>
                
                  
          </div>
      
         
         <Print agent={client.name} phone={client.phone} total={77} discount={0}  carpetsQ ={carpets} />
        </div>)
}