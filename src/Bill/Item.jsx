
//import './item.css'
import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from 'react';
import {db} from '../ViewDB/Carpets'
/*
function Header(){
  return(
    <div className='header'>
   <table className="table-header">
    <tbody>
      <tr>
        <td>الذوق الرفيع للسجاد</td>
      </tr>
      <tr>
        <td> كفر مستناد - كوبري العرب</td>
      </tr>
      <tr>
        <td>phone: 011XXXXXXXX</td>
      </tr>
    </tbody>
  </table>
  <div className="avatar-bill"><img src={Avatar}/></div>
  <table className="table-header">
    <tbody>
      <tr>
        <td>id: xx xxx xx</td>
      </tr>
      <tr>
        <td>تاريخ :10/05/2023</td>
      </tr>
      <tr>
        <td>اسم العميل:عمار الشريف</td>
      </tr>
    </tbody>
  </table>
  </div>
  )
}

//--------------------------------
const picked=null;

function Item(){
  const [Id,setId]=useState();
  
  
  ;
  /*function getCarpet(id){
    db.carpets.get(id).then(function(item) {
      return item
    });
    function handleChange(event, value){
      setId(value.id)
      
    }
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
        getOptionLabel={(option) =>{
          setId(option.id);
          picked = Id;
          return `${option.id},${option.model},${option.W},${option.L},${option.t_price}`
        }}
        sx={{ width: 400 }}
        renderInput={(params) => <TextField className='txt-field' {...params} label="موديل" />}
      />
       </th>
     </thead>
     </table>
     <button>{Id}</button>
    </div>
)
}
//---------------------
function Print(){
const [addedList,setAddedList]=useState([])
return (

<div className="print">

 <Header/>
 <button onClick={setAddedList([...addedList,picked])}>+</button>
</div>
);
}

export default  function Bill(){
return (
<div className="body">
  <Item/>
  
  <ReactToPrint
    trigger={() => <a href="#">Print this out!</a>}
    content={() => this.componentRef}
    
  />
  <Print  ref={el => (this.componentRef = el)} />
</div>
);
}
*/ 