import React from 'react';
import './Print.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect } from 'react';
//import { writeFile } from '@tauri-apps/api/fs';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//import htmlToPdfmake from 'html-to-pdfmake';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import arabicFont from './NotoSansArabic-Thin.ttf'
//https://www.makeuseof.com/how-to-use-props-in-reactjs/

export default function Print(props){
    

//   function printDocument() {
//     const tableHtml = document.getElementById('divToPrint');
//     const tableContent = htmlToPdfmake(tableHtml);
//     const docDefinition = {
//       content: [tableContent],
//       defaultStyle: {
//         font: 'myArabicFont',
//       },
//     };
//     pdfMake.createPdf(docDefinition).open();
//   }
function printDocument(){
     const input = document.getElementById('divToPrint');
     html2canvas(input)
     .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.output('dataurlnewwindow');
    });
        
    }
    //time and date
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());    
    useEffect(() => {
      const timerID = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timerID);
    }, []);
    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timerID);
      }, []);

    return (
      <div className="print-container mt-5">
       <button className="btn btn-primary" onClick={printDocument}>Export To PDF</button>
      <div id="divToPrint" className="m-3">
      <div >
      
        <div >
            <div className="bill-card">
                <div className="p-2">
                    <div className="d-flex flex-column"> <span className="font-weight-bold">فاتورة</span> <small>ID: XXXX</small> </div>
                    <div><span>الذوق الرفيع للسجاد</span></div>
                    <div><span>phone: 01XXXXXXXXX</span> </div>
                    <div><small>{time.toLocaleTimeString()}</small></div>
                    <div><small>{date.toLocaleDateString()}</small></div>
                    
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