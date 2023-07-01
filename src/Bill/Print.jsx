import React from 'react';
import './Print.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import arabicFont from './NotoSansArabic-Thin.ttf'
import { useState , useEffect } from 'react';
//import { writeFile } from '@tauri-apps/api/fs';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//import htmlToPdfmake from 'html-to-pdfmake';
//https://www.makeuseof.com/how-to-use-props-in-reactjs/



export default function Print(props){
    
    function printDocument(){
        
        
        let component = document.getElementById('divToPrint');
                    // Create a new jsPDF document with page size set to A5
                    let doc = new jsPDF('p', 'mm', 'a5');
      
                // Set the maximum height of each page
                let pageHeight = doc.internal.pageSize.height - 20;
      
                // Use html2canvas to capture the content of the component as an image
                html2canvas(component).then(canvas => {
                // Get the image data
                let imgData = canvas.toDataURL('image/png');
      
                // Calculate the height of the image in millimeters
                let imgHeight = canvas.height * 150 / canvas.width;
      
                // Keep track of the current height position on the page
                let heightLeft = imgHeight;
                let position = 9;
      
                // Add the image to the first page of the jsPDF document
                doc.addImage(imgData, 'PNG', 9, position, 128, imgHeight);
                heightLeft -= pageHeight;
      
                // Add additional pages if needed
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 9, position, 128, imgHeight);
                    heightLeft -= pageHeight;
                }
                // Save the jsPDF document
                doc.output('dataurlnewwindow');
                });
        }
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
      
      <div  className="m-3" id="divToPrint" style={{width: '128mm'}}>
      <div  className='scanned'>
      
        <div >
            <div className="bill-card">
                <div className="header-row">
                    <div className="header-col"> 
                    <small>اسم العميل : {props.agent}</small>
                    <small>تليفون :{props.phone}</small>
                    
                    
                     </div>
                     
                    <div className="header-col print-title"><span> </span></div>
                    <div className="header-col"><small>الذوق الرفيع</small><small>{time.toLocaleTimeString()}</small><small>{date.toLocaleDateString()}</small></div>
                </div>
                
                <div className="products p-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="add">
                                <td>موديل</td>
                                <td>عدد</td>
                                <td>عرض</td>
                                <td>طول</td>
                                <td>سعر</td>
                                
                            </tr>
                            
                            
                            {/*addedCarpets.map()
                             
                            */
                            
                            props.carpetsQ.map((x)=>{
                                return x
                            })
                            
                            }
                            <tr><td className="text-center">{` مجموع  : ${props.total} `}</td></tr>
                            <tr><td className="text-center">{`خصم  : ${props.discount} سرفلة  : ${props.addition} `}</td></tr>
                            <hr/>
                            <tr><td className="text-center">{`اجمالي  : ${props.total1} `}</td></tr>
                        </tbody>
                    </table>
                </div>
         
               
                </div>
             
                <div className="address p-2">
                    <table className="table table-borderless">
                        <tbody>
                            
                            <tr className="content">
                                <td><small>مستناد طريق شبراخيت - فرنوى , 01006658433</small> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="btn-primary" onClick={printDocument}>طباعة</button>
            </div>
        </div>
    </div>
        </div>
        
        
    
   )}