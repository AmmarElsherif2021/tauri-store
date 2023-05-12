import React from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../ViewDB/Carpets";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ReactToPrint from "react-to-print";
import './bill.css'
import Avatar from './bill.png'
import Print from './Print';
//import Item from "./Item";

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';




export default function Bill(){
//front--------------------------------------------------------------------------------------

    
//Print
    
//back ----------------------------------------------------------------------------------------
//carpets
    const data = useLiveQuery(() => db.carpets.toArray(),[]);
    const [picked,setPicked]=useState()
    const [addedList,setAddedList]=useState([])
    const [addedCarpets,setAddedCarpets]=useState([])
    const [sum,setSum]=useState(0);
    const [status,setStatus]=useState(true)
 
//adding carpets to bill   
     
    //handle qty:
    function handleQty(id){
        db.carpets.get(id).then((result) => {
            setAddedCarpets(()=>[...addedCarpets,result])
           })
    }
    function updateCarpets(id){
        db.carpets.get(id).then((result) => {
           setAddedCarpets(()=>[...addedCarpets,result])
          });
          
    }
//handle sum
    function handleSum(){
        db.carpets.get(picked).then((result) => {
            setSum((prevSum)=>prevSum+Number(result.t_price))
           });
        
    }
 //handle adding items
    function handleAdd(){
        setAddedList(()=>{return [...addedList,picked]});
        updateCarpets(picked);
        handleSum();
        handleClear();
        console.log(addedCarpets)
    }

//clear Autocomplete after adding
  const [value, setValue] = useState(null);
  const [key, setKey] = useState(0);

  const handleClear = () => {
    setValue(null);
    setKey((prevKey) => prevKey + 1);
    setPicked(null)
  };
//customer data......................
   const [client,setClient]=useState({
    'name':'',
    'phone':''
   })
   const inputValidation = (e) => {
    // get value form event
    const value = e.target.value;
    // validate value
    const validatedValue = value.replace(/[^0-9]/g, '');
    return validatedValue;
    }
    const handleClientPhone=(e)=>setClient((x)=>{
        return{
            ...x,
            'phone':e.target.value
        }
    })
   
    return(
        <div>
       
          <div className="bill-inputs">
                
          <Autocomplete
                disablePortal="true"
                id="dataList"
                key={key}
                value={value}
                onChange={(e, value) => {
                    setValue(()=>value)
                    setPicked(()=> value.id);
                }}
                options={data}
                getOptionLabel={(option) =>{
                
                    return `${option.model}--${option.W}--${option.L}--${option.t_price}`
                }}
                className="auto-complete"
                sx={{ width: 700 }}
                renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
                />
                <Autocomplete
                disablePortal="true"
                id="qty"
                
                
                options={data}
                getOptionLabel={(option) =>{
                
                    return option.qty
                }}
                className="complete"
                sx={{ width: 50 }}
                renderInput={(params) => <TextField  {...params} label="كمية" className='num'/>}
                />

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
          </div>
      
         <button onClick={handleAdd} className="add-btn btn">Add</button>
         <Print agent={client.name} phone={client.phone} total={sum} discount={0} standby={addedCarpets} />
        </div>)
}