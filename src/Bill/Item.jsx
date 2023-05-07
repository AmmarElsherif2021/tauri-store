import Hero from '../Hello/Hero/Hero'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './item.css'
import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import {db} from '../ViewDB/Carpets'
import { red, yellow } from '@mui/material/colors';



export default function Item(){
  const data = useLiveQuery(() => db.carpets.toArray(), []);
    //const data = useLiveQuery(() => db.carpets.toArray(), []);
   
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
            options={data}
            getOptionLabel={(option) => `  ${option.W} X ${option.L} , ${option.t_prics} , ${option.model}`}
            sx={{ width: 400 , background:yellow }}
            renderInput={(params) => <TextField className='txt-field' {...params} label="موديل" />}
          />
           </th>
           <th>أضف</th>
           
         </thead>
         </table>
         
        </div>
    )
}

    