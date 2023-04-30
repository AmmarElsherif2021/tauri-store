import Hero from '../Hello/Hero/Hero'
import './bill.css'
import React from 'react'
export default function Bill(props){
    const bill_backData={
      id:0,
      client_n:'XXXX XXXX XXXX',
      client_phone:'+20XXXXXXXXXX',
      history:'XX-XX-XXXX',

    }
    return(
        <div className='bill'>
        <BillKey/>
        <Adds />
        </div>
    )
}
function BillKey(){
  return(
    <div>
    {
      bill_backData.map((ele)=>(
        <ul>
          <li>{`id: ${ele.id}`}</li>
          <li>{`client name: ${ele.client_n}`}</li>
          <li>{`client phone: ${ele.client_phone}`}</li>
          <li>{`history: ${ele.client_phone}`}</li>
        </ul>
      ))
    }
    </div>
  )
}
function Adds() {
    const backendData = [
      { title: "Grocery List", W: 0.8,L:1.2,price_m:70, createdat: "01-18-2021" ,count:1},
      { title: "Math Homework", W: 0.8,L:4.0,price_m:60, createdat: "12-01-2020" ,count:1},
      { title: "Call James", W: 0.9,L:3.0,price_m:90,createdat: "12-30-2020",count:1 }
    ]
  
    let counter=0;
    
    return (
      <div style={{ width: 500 }}>
        {
          backendData.map((ele )=>
            
          (<div className='note-root'>
            <ul>
            <li>{ele.title}</li>
            <li>{`${ele.L} X ${ele.W} = ${ele.W*ele.L}`}</li>
            <li>{ele.t_price}</li>
            <li>{ele.count}</li>
            </ul>
           </div>)
          
        )}
        <ul>
          <li>Total:</li>
          <li>---</li>
          <li>---</li>
          
        </ul>
      </div>
    )
  }
