import Hero from '../Hello/Hero/Hero'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './item.css'
import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from 'react';
import {db} from '../ViewDB/Carpets'
import { red, yellow } from '@mui/material/colors';



const carpet=useState()
async function addCarpet(event) {
  event.preventDefault()
  try {

    // Add the new Carpet!
    const id = await db.carpets.add({
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
export default function Item(){
  const data = useLiveQuery(() => db.carpets.toArray(), []);
  function handleClick(ev){
    carpet.setState(ev.target.value)
  }
    return(
        <div className='item'>
         
         <table className="input-table">
         <thead>
           <th>
           <Autocomplete
            disablePortal
            id="dataList"
            options={data}
            getOptionLabel={(option) => `${option.W}X${option.L} , ${option.t_prics} , ${option.model}`}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField className='txt-field' {...params} label="موديل" />}
          />
           </th>
           <th><button onClick={handleClick}>أضف</button></th>
           
         </thead>
         </table>
         
        </div>
    )
}

    