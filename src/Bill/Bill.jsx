import React from "react";
import ReactToPrint from "react-to-print";
import './bill.css'
import Avatar from './bill.png'
import Item from "./Item";
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
function Print(){
  return (
    
    <div className="print">
     <Header/>
     
     <table className="table">
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
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