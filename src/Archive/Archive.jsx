import React from 'react';
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import './Archive.css'
import { archiveDB } from './ArchDB';



export default function Archive(){
    
    const data = useLiveQuery(() => archiveDB.bills.toArray(), []);

    return(
        <div className='archive'>
        <h1>Archive !</h1>
        <table className='archive-table'>
         <tbody>
         {data?.map(bill => <tr className='item' key={bill.id}>
    
            <td className='cell txt-cell'>{bill.id}</td>
            <td className='cell'>{bill.name}</td>
            <td className='cell'>{bill.phone}</td>
            <td className='cell'>{bill.history}</td>
            <td className='cell'>{bill.total}</td>
            <td className='cell'>{bill.carpets}</td>
            <td><button className='edit-btn'>edit</button></td>
         </tr>)}
         </tbody>
        </table>
        </div>

        )
}