import React from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../ViewDB/Carpets";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ReactToPrint from "react-to-print";
import './bill.css'
import Avatar from './bill.png'
//import Print from './Print';
//import Item from "./Item";

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';




export default function Bill(){
//front--------------------------------------------------------------------------------------

    
//Print
    function Print(props){

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
                                    <td>num</td>
                                    <td>W</td>
                                    <td>L</td>
                                    <td>Price</td>
                                    
                                </tr>
                                
                                
                                {addedCarpets.map((x)=>{
                                    return(
                                    <tr className="content">
                                    <td>{x.model}</td>
                                    <td>#</td>
                                    <td>{x.W}</td>
                                    <td>{x.L}</td>
                                    <td>{x.t_price}</td>
                                    </tr>
                                    )
                                })}
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
//back ----------------------------------------------------------------------------------------
//carpets
    const data = useLiveQuery(() => db.carpets.toArray(),[]);
    const [picked,setPicked]=useState()
    const [addedList,setAddedList]=useState([])
    const [addedCarpets,setAddedCarpets]=useState([])
    const [sum,setSum]=useState(0)
 
//adding carpets to bill   
    function updateCarpets(id){
        db.carpets.get(id).then((result) => {
           setAddedCarpets(()=>[...addedCarpets,result])
          });
          
    }
//handle sum
    function handleSum(){
        db.carpets.get(picked).then((result) => {
            setSum((prevSum)=>prevSum+Number(result.t_price))
           });
        
    }
 //handle adding items
    function handleAdd(){
        setAddedList(()=>{return [...addedList,picked]});
        updateCarpets(picked);
        handleSum();
        handleClear();
        console.log(addedCarpets)
    }

//clear Autocomplete after adding
  const [value, setValue] = useState(null);
  const [key, setKey] = useState(0);

  const handleClear = () => {
    setValue(null);
    setKey((prevKey) => prevKey + 1);
    setPicked(null)
  };
//customer data......................
   const [client,setClient]=useState({
    'name':'',
    'phone':''
   })
   const inputValidation = (e) => {
    // get value form event
    const value = e.target.value;
    // validate value
    const validatedValue = value.replace(/[^0-9]/g, '');
    return validatedValue;
    }
    const handleClientPhone=(e)=>setClient((x)=>{
        return{
            ...x,
            'phone':e.target.value
        }
    })
   
    return(
        <div>
       
          <div className="bill-inputs">
                <Autocomplete
                disablePortal="true"
                id="dataList"
                key={key}
                value={value}
                onChange={(e, value) => {
                    setValue(()=>value)
                    setPicked(()=> value.id);
                }}
                options={data}
                getOptionLabel={(option) =>{
                
                    return `${option.model}--${option.W}--${option.L}--${option.t_price}`
                }}
                className="auto-complete"
                sx={{ width: 700 }}
                renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
                />

                <input
                    type="text"
                    placeholder="name"
                    onChange={(e)=>setClient((x)=>{
                        return{
                            ...x,
                            'name':e.target.value
                        }
                    })}
                    />
                    <input
                    type="tel"
                    
                    placeholder="phone"
                    onChange={
                        inputValidation && handleClientPhone
                        }
                  />
          </div>
      
         <button onClick={handleAdd} className="add-btn btn">Add</button>
         <Print agent={client.name} phone={client.phone} total={sum} discount={0}  />
        </div>)
}