import React from 'react';
import './Print.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
//https://www.makeuseof.com/how-to-use-props-in-reactjs/
export default function Print(props){
    
    function printDocument(){
          const doc = new jsPDF();
         
          //get html
          const pdfTable = document.getElementById('divToPrint');
          //html to pdf format
          var html = htmlToPdfmake(pdfTable.innerHTML);
        
          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(documentDefinition).open();
        
    }
    
    
    return (
      <div className="bill-container mt-5">
       <button className="btn btn-primary" onClick={printDocument}>Export To PDF</button>
      <div id="divToPrint" className="m-3">
      <div >
      
        <div >
            <div className="bill-card">
                <div className="p-2">
                    <div className="d-flex flex-column"> <span className="font-weight-bold">فاتورة</span> <small>ID: XXXX</small> </div>
                    <div><span>الذوق الرفيع للسجاد</span></div>
                    <div><span>phone: 01XXXXXXXXX</span> </div>
                </div>
                
                <hr />
                
                <hr />
                
                <div className="products p-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="add">
                                <td>Model</td>
                                <td>qty</td>
                               
                                <td>W</td>
                                <td>L</td>
                                <td>Price</td>
                                
                            </tr>
                            
                            
                            {/*addedCarpets.map()
                             
                            */
                            
                            props.carpetsQ.map((x)=>{
                                return x
                            })
                            
                            }
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="products p-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="add">
                                
                                <td>خصم</td>
                                <td className="text-center">اجمالي</td>
                            </tr>
                            <tr className="content">
                                
                                <td>{props.discount}</td>
                                <td className="text-center">{props.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="address p-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="added">
                                <td>بيانات الفاتورة</td>
                            </tr>
                            <tr className="content">
                                <td>{props.agent}:اسم العميل <br />{props.phone}:تليفون<br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        </div>
        
        
      </div>
   )}