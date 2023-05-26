import React from 'react';
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from 'react-router-dom';
import './Archive.css'
import { archiveDB } from './ArchDB';
import Bill from '../Bill/Bill';


export default function Archive(){
  const navigate = useNavigate();
    //bill[0].carpets.map((x)=>console.log(x))
    async function handleClick(bill) {
        console.log('try')
        
        try {
          
          const data2 = await archiveDB.bills.get(bill.id);
          navigate("/Bill", { state: { data2 } });
          console.log(`ffffffffffffffffffffffffffffff ${data2}`)
          console.log(`bill check --------------------------------------------------->${bill.carpets.map((x)=>x.model)}`)
          
        } catch (error) {
          console.log(error);
        }
      }
      
    const data = useLiveQuery(() => archiveDB.bills.toArray(), []);
    // function returnBack(bid){
    //   setItems((prevItems)=>prevItems.filter(item => item.id !== bid)) 
    //   setCarpetsjsx((prevItems)=>prevItems.filter(item => item.props.val.id !== bid))
    //   handleClear() 
    // }
    return(
        <div className='archive'>
        <h1>فواتير سابقة</h1>
        <table className='archive-table'>
        <thead>
        <tr>
        <th className='archive-cell'>id</th>
        <th className='archive-cell'>الاسم</th>
        <th className='archive-cell'>تليفون</th>
        <th className='archive-cell'>تاريخ</th>
        <th className='archive-cell'>اجمالي</th>
        <th className='archive-cell'>المباع</th>
        <th className='archive-cell'>-</th>
        </tr>
        </thead>
        
         <tbody>
         
         {data?.map(bill =>( <tr className='archive-item' key={bill.id}>
    
            <td className='archive-cell txt-archive-cell'>{bill.id}</td>
            <td className='archive-cell'>{bill.name}</td>
            <td className='archive-cell'>{bill.phone}</td>
            <td className='archive-cell'>{bill.history}</td>
            <td className='archive-cell'>{bill.total}</td>
            <td className='archive-cell archive-items-cell'>{bill.carpets && bill.carpets.map((x)=>`${x.model}-${x.reqQty}`)}</td>
            <td className='archive-cell'><button onClick={()=>archiveDB.bills.delete(bill.id)}>-</button><button className='edit-btn' onClick={()=>handleClick(bill)}>edit</button></td>
         </tr>))}
         </tbody>
        </table>
        </div>

        )
}