import Hero from '../Hello/Hero/Hero'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './item.css'
import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../ViewDB/Carpets'

export default function Item(props){
    let queryValue;
    //const data = useLiveQuery(() => db.carpets.toArray(), []);
    const data = (async () => {
   
      return await db.carpets
        .toArray();
    });
    /*data?.map(x =>dataList.push(
      {
        'key':x.id,
        'model':x.model,
        'W':x.W,
        'L':x.L,
        't_price':x.t_price,
        
      }
    ))
    const dataList=[]
    //data.map((x)=>dataList.push(x))
    */
    return(
        <div className='item'>
         
         <table className="input-table">
         <thead>
           <th>
           <Autocomplete
            disablePortal
            id="dataList"
            options={dataList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="موديل" />}
          />
           </th>
           <th>column 2</th>
           <th>column 3</th>
         </thead>
         </table>
        </div>
    )
}

    