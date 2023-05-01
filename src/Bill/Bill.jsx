import Hero from '../Hello/Hero/Hero'
import './bill.css'
import React from 'react'
export default function Bill(props){
    
    return(
        <div className='bill'>
        <BillKey/>
        <Adds />
        </div>
    )
}
function BillKey(){
  const bill_backData={
      'id':'xxx',
      'client_n':'XXXX XXXX XXXX',
      'client_phone':'+20XXXXXXXXXX',
      'history':'XX-XX-XXXX',
    }
    
  return(
        <div className="header">
          <div className="store_info">
            <p>الذوق الرفيع للسجاد</p>
            <p>facebook: /hozifa_store</p>
            <p>whatsapp: +201158277488</p>
          </div>
          <div className="hero"><h1> hi bill</h1></div>
          <div className="client_info">
            <p>id: {bill_backData['id']} </p>
            <p>Date: {bill_backData['history']}</p>
            <p>client_n: {bill_backData['client_n']} </p>
            <p>phone: {bill_backData['client_phone']}</p>
          </div>
        </div>
       
    
  )
}
function Adds() {
    const backendData = [
      { title: "Grocery List", W: 0.8,L:1.2,price_m:70, createdat: "01-18-2021" ,count:1},
      { title: "Math Homeworkkkkkkkkkkkkkkkkkkk", W: 0.8,L:4.0,price_m:60, createdat: "12-01-2020" ,count:1},
      { title: "Call James", W: 0.9,L:3.0,price_m:90,createdat: "12-30-2020",count:1 }
    ]
  
    let counter=0;
    
    return (
      <div className='bill_body'>
      <ul className='note_list'>
      <li><h3>Model</h3></li>
      <li><h3>W x L = A</h3></li>
      <li><h3>Total price</h3></li>
      <li><h3>Count</h3></li>
      </ul>
        {
          backendData.map((ele )=>
            
          (<div className='note-root'>
             
            <ul className='note_list'>
            <li>{ele.title}</li>
            <li>{`${ele.L} X ${ele.W} = ${ele.W*ele.L}`}</li>
            <li>{ele.t_price}</li>
            <li>{ele.count}</li>
            </ul>
           </div>)
          
        )}
        <ul className='note_list'>
          <li><h3>Total:</h3></li>
          <li>---</li>
          <li>---</li>
          
        </ul>
      </div>
    )
  }
