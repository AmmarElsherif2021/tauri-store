/*
1-roll width:60,80,100,120,150,200.
2-lock
3-export data
4-req qty in bill problem
5-bill archive
*/ 


import React, { useEffect } from "react";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useLocation } from "react-router-dom";
import { db } from "../ViewDB/Carpets";

import { archiveDB } from "../Archive/ArchDB";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import validator from 'validator';
import { v4 as uuidv4 } from "uuid";
import './bill.css'
import Print from './Print';





export default function Bill(){
//The final bill object:
const [name,setName]=useState('');
const [phone,setPhone]=useState('');
const [history,setHistory]=useState('');
const [items,setItems]=useState([])
    const [carpetsjsx,setCarpetsjsx]=useState([])
const [carpets,setCarpets]=useState([]);
const [discount,setDiscount]=useState(0);
const [addition,setAddition]=useState(0)
const location = useLocation();

//items 

//re-open a bill .................iiiiii..ii..ii..iiiii......iiiii..ii..ii..iiiii..................
          //........................ii....iiiiii..iiiii......iiiii..iiiiii..ii..ii....................
          //........................ii....ii..ii..iiiii......iiiii..ii..ii..iiiii.......................
          
          const [billModified, setBillModified] = useState({});
        
         
          useEffect(() => {
            console.log('location.state?.bill:', location.state?.data2);
            setBillModified(location.state?.data2);
          }, [location.state?.data2]);
        
          useEffect(() => {
            console.log('billModified:', billModified);
            if (billModified && billModified.hasOwnProperty('id')) {
              //archiveDB.bills.delete(billModified.id)
              setCarpets(()=>[...billModified.carpets]);
              setItems(()=>[...billModified.carpets]);
              setName(()=>billModified.name)
              setPhone(()=>billModified.phone)
              setTotal(()=>billModified.carpets.reduce((acc, item) => acc + Number(item.t_price), 0))
              //setHistory()
              
              setCarpetsjsx(()=>billModified.carpets.map((x)=><Carpet key={x.id} val={x}/>))
              // billModified.carpets.map((x)=>{
              //   setError(' تم ارجاع سجاد الفاتورة الى قاعدة البيانات! تأكد من ضغط حفظ بعد التعديل')
              //  let returned=db.carpets.get(x.id)
              //   if(returned && returned.type!='r'){
              //     db.carpets.update(x.id,{qty:Number(x.qty)+Number(x.reqQty)})
              //   }else if(returned && returned.type=='r'){
              //     db.carpets.update(x.id,{qty:Number(x.L)+Number(x.reqLen)})
              //   }
              // })
              console.log(`BILL ZOMBIE ${Object.keys(billModified)}`);
              setBillModified({});
            }
          }, [billModified]);
          useEffect(()=>{
            if(items){
              console.log('render <CARPETS/>')
              items.map((x)=>console.log(x.model))
              
              //setCarpetsjsx(()=>items.carpets.map((x)=><Carpet key={x.id} val={x}/>))
            }
          },[items])
//UPDATE YOUR DB.....................................
async function deleteRecord(id) {
  try {
   // await db.carpets.delete(id);
    console.log(`Record with id ${id} was deleted from the carpets table`);
  } catch (err) {
    console.error(`An error occurred while deleting record with id ${id} from the carpets table: ${err}`);
  }
}
//useEffect(()=>deleteRecord(1),[])

// async function handleUpdate(id) {
//   try {
//     await db.carpets
//       .where("id")
//       .equals(id)
//       .modify(async (carpet) => {
//         const added = carpets.find((item )=> item.id === carpet.id);
//         console.log(`handleUpdate called ${carpet.model}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
//         if (carpet.type != "r") {
//           console.log(`req qty: ${added.reqQty}`)
//           if (carpet.qty >= added.reqQty) {
//             carpet.qty -= added.reqQty;
//             console.log(`Carpet qty updated: ${carpet.qty}`);
//           } else{
//             console.log(`carpet.qty >${carpet.qty} added.reqQty> ${carpet.qty}id${id}`)
//             await db.carpets.delete(carpet.id).catch((err) => console.error(`An error occurred while deleting carpet with id ${id}: ${err}`));
//             console.log(`Carpet with id ${id} was deleted`);
//           }
//         } else {
//           if (carpet.L >= added.reqLen) {
//             carpet.L -= added.reqLen;
//             console.log(`Carpet with id ${id} was trimmed`);
//           } else {
            
//             await db.carpets.delete(carpet.id).catch((err) => console.error(`An error occurred while deleting carpet with id ${id}: ${err}`));
//             console.log(`Carpet with id ${id} was deleted`);
//           }
//         }
//       });
//     //console.log(`Carpet with id ${id} had their qty/len decremented`);
//   } catch (err) {
//     console.error(`An error occurred while updating carpet with id ${id}: ${err}`);
//   }
// }

async function addBill() {
  try {
    // Add the new Bill!
    const id = await archiveDB.bills.add({
      name,
      phone,
      history,
      total,
      carpets,
    });
    console.log(
      `Bill added: ${carpets.length}`
    );
    setError(
      () =>
        `Bill name: ${name}, total: ${total}, carpets: ${carpets} successfully added. Got id: ${id}`
    );
    console.log(`carpets to update in DB:${carpets.length}`)
    carpets.map((x) => console.log(x.model))
   
      
    
    setName("");
    setPhone("");
    setHistory("");
    setTotal(0);
    setCarpets([]);
    setCarpetsjsx([]);
    setItems([]);
    handleClear();
  } catch (error) {
    setError(
      `Failed to add bill: ${name} ${phone} ${history} ${total} ${carpets}, error: ${error}`
    );
  }
}


          
          
//back ----------------------------------------------------------------------------------------
//DB 
const data = useLiveQuery(() => db.carpets.toArray(),[]);
   
//States needed in your bill:
    //carpets
    
    // function returnBack(bid){
    //   setItems((prevItems)=>prevItems.filter(item => item.id !== bid)) 
    //   setCarpetsjsx((prevItems)=>prevItems.filter(item => item.props.val.id !== bid))
    //   handleClear() 
    // }
    const Carpet=(props)=>(
      <tr className="added" key={props.val.id}>
        <td>{props.val.model}</td>
        <td>{props.val.reqQty}</td>
        <td>{props.val.W}</td>
        <td>{props.val.type=='r'?props.val.reqLen:props.val.L}</td>
        <td>{props.val.t_price}</td>
        
      
      </tr>                        
    )
    
  
    //quntity of picked value
    const [qty,setQty]=useState(1)
    
    //error
    const[error,setError]=useState('')
    const Error=()=>(
      <div className='error'><span><small>{error}</small></span></div>
    )
    //clear Autocomplete after adding
      const [value, setValue] = useState(null);
      const [total,setTotal]=useState(0);
      const [key, setKey] = useState(0);
    

            //Validate inputs
            const validatePhoneNumber = (number) => {
              const isValidPhoneNumber = validator.isMobilePhone(number, ['ar-EG']);
              return isValidPhoneNumber;
            }
              

            // Handle clear
            const handleClear = () => {
              setValue(null);
              setKey((prevKey) => prevKey + 1);
              //setQty(1)
              setQtyTemp(0)
            };
            
            // Adding to bill
            function prepareForDB(){
                  setCarpets(()=>items)
                  
            }
            useEffect(()=>console.log(`added carpet len ${carpets.length}`),[carpets])
            //Handle add one carpet
            function handleAdd(){
              
                if(value &&value.type !='r' && value.reqQty<=value.qty){
                  console.log(`####### items: ${items} - ${Object.keys(value)}`)
                  setItems((prevItems)=>prevItems.filter((x)=>x.id!=value.id))
                  setValue((prevValue)=>({
                    ...prevValue,
                    t_price:Number(prevValue.W)*Number(prevValue.L)*0.0001*Number(prevValue.reqQty)*Number(prevValue.price_m),
                    }))
                  setCarpetsjsx((prevCarpets)=>prevCarpets.filter((x)=>x.key!=value.id))
                  setCarpetsjsx((prevCarpets)=>[...prevCarpets,<Carpet key={value.id} val={value} />])
                  //setTotal(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
                  
                  setQty(1)
                  setError(()=>'')
                  //setItems((prevItems)=>prevItems.filter(item => item.id !== value.id))
                  
                  setItems((prevItems)=>[...prevItems,value])
                  //console.log(`items ======================================= ${items.length}`)
                  setCarpets(()=>items)
                  //console.log(`carpets len ${carpets.length}`)
                  handleClear()
                  
                }else if(value && value.type=='r' && value.reqLen<=value.L){
                  setItems((prevItems)=>prevItems.filter((x)=>x.id!=value.id))
                  setValue((prevValue)=>({
                    ...prevValue,
                    reqLen:Number(prevValue.reqLen)+qtyTemp,
                    t_price:(Number(prevValue.W)*0.0001*(Number(prevValue.reqLen))*Number(prevValue.price_m)).toFixed(0),
                    }))
                  setCarpetsjsx((prevCarpets)=>prevCarpets.filter((x)=>x.key!=value.id))
                  setCarpetsjsx((prevCarpets)=>[...prevCarpets,<Carpet key={value.id} val={value} />])
                  //setTotal(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
                  
                  
                  setError(()=>'')
                     //setItems((prevItems)=>prevItems.filter(item => item.id !== value.id))
                  
                  setItems((prevItems)=>[...prevItems,value])
                  console.log(items)
                  setCarpets(()=>items)
                  handleClear()
                }else{
                  setError('  --تجاوزت الكمية المتاحة')
                };
            }

          //Temp qty handler
          const [qtyTemp,setQtyTemp]=useState(0)
          useEffect(()=>{
            console.log('qty handled')
          },[qtyTemp])
        
          useEffect(()=>{
            console.log('qty handled')

          },[carpets])
          //handle Quantity
          function handleValueQty(e){
            
              if(value ){
                    if(Number(e.target.value)+qtyTemp<=Number(value.qty)){ //SOME ERROR AQUIRED ADDING ONE

                      setQty(()=>Number(e.target.value))

                      setValue((prevValue)=>({
                        ...prevValue,
                        t_price:Number(prevValue.W)*Number(prevValue.L)*0.0001*(Number(e.target.value)+qtyTemp)*Number(prevValue.price_m),
                        reqQty:Number(e.target.value)+qtyTemp}))       
                  }else{
                    setError(()=>'تجاوزت الكمية المتاحة   ')
                    handleClear()
                  }
                }
            }
          
          //handle trimming Roll
           function handleTrim(e){
            e.preventDefault()
            if(value && value.type=='r'){
              if(e.target.value <= value.L-qtyTemp){
                setValue(
                  (prevValue)=>({
                    ...prevValue,
                    reqLen:Number(e.target.value),
                    t_price:(Number(e.target.value))*prevValue.W*prevValue.price_m*.0001
                  })
                    
                )
                
              }else{
                setError(()=>'تجاوزت الكمية المتاحة')
                handleClear()
              }
            }
          }

          
          
          //force update
          useEffect(()=>console.log(`items ------------`),[items])
          useEffect(()=>setCarpets(items),[items])
          useEffect(()=>console.log(`bill modified`),[billModified])
          useEffect(()=>console.log('added carpets for bill triggered')
            ,[carpets])
            useEffect(()=>
            setHistory(()=>{
              const date = new Date();
              const day = date.getDate();
              const hour = date.getHours();
              const minute = date.getMinutes();
              return`${day}-${hour}-${minute}`
            })
            ,[carpets])
          useEffect(()=>{
            console.log('value changed')
            console.log(value)
           },[value])
          useEffect(()=>{if(error){
              console.log(`some inputs error ${error} check this items ${Object.keys(items)} items ${phone} name ${name} ` )
            }}
            ,[])
            useEffect(()=>{
            console.log('Hola items !!!!!!!!!!')
            if(items){
              console.log('CMON HERE')
              setTotal(()=>items.reduce((acc, item) => acc + Number(item.t_price), 0))
              
            }}
            ,[items])
            useEffect(()=>console.log('total come home'),[total])
         useEffect(()=>console.log('qty readded'),[qtyTemp])
         //00000000000000000000000000000000000000000000000000\
         useEffect(()=>{
          if(carpets){
            carpets.map((x)=>console.log(`check ===>>${Object.keys(x)}`))
          }
         },[carpets])
         useEffect(()=>console.log('mmm'),[discount])
         
         useEffect(()=>console.log('nnn'),[addition])






    return(
        <div className="bill-container">
          <div className='bill-title container-row'><h1>فاتورة جديدة</h1>
          <button className='save-bill-btn' onClick={()=>{if(carpetsjsx.length>0){addBill()} }}>+ حفظ</button></div>
          
          <div className="bill-inputs container-row">
                <div className='input-row'>
                <Autocomplete
                disablePortal={true}
                id="dataList"
                key={key}
                value={value}
                onChange={(e, v) => {
                  let result=items.find(x => x.id === v.id)
                    if(result){
                      
                      setValue(result)
                      if(result.type!='r'){
                            setQtyTemp(()=>Number(result.reqQty))
                            setValue((prevValue)=>(
                            {
                              ...prevValue,
                              //qty: Number(prevValue.qty)-Number(prevValue.reqQty),
                              reqQty:1+prevValue.reqQty,
                              t_price:Number(prevValue.t_price)+Number(prevValue.W)*Number(prevValue.L)*0.0001*Number(prevValue.reqQty)*Number(prevValue.price_m)
                            }
                          )
                        )
                      }else{
                        setQtyTemp(()=>Number(result.reqLen))
                        setValue((prevValue)=>(
                          {
                            ...prevValue,
                            reqQty:0,
                            //qty: Number(prevValue.qty)-Number(prevValue.reqQty),
                            //reqLen:prevValue.reqLen,
                            t_price:Number(prevValue.W)*Number(qtyTemp)*0.0001*Number(prevValue.price_m),
                            reqLen:prevValue.reqLen,
                            
                          }
                         ))
                      }
                    }
                    else{
                      setValue(()=>({
                        ...v,
                        reqQty:1
                      }))
                    }
                    if(value&& value.type=='r'){
                      setValue((prevValue)=>(
                        {
                          ...prevValue,
                          reqLen:0,
                          t_price:0,
                          reqQty:0
                        }
                        ))
                    }
                    setError(()=>'')     
                }}
                options={data}
                getOptionLabel={(option) =>{
                
                    return `${option.model},${option.W},${option.L}`
                }}
                className="auto-complete"
                sx={{ width: 700 }}
                renderInput={(params) => <TextField  {...params} label="موديل" className='txt-field'/>}
                />
                {
                  value && value.type=='r'?
                  <p>
                    طول
                    <input
                    type="number"
                    min="0"
                    placeholder="len"
                    value={value.reqLen}
                    onChange={handleTrim}
                    step="1"
                    />
                  </p>
                  :
                  <p>
                     كمية
                    <input
                    type="number"
                    min="1"
                    
                    placeholder="qty"
                    value={qty}
                    onChange={handleValueQty}
                    />
                  </p>
                  }
                <button className="add-btn btn" onClick={handleAdd}>+</button>  
                </div>
                
                
                <div className='input-row'>
                <p>
                <input
                type="text"
                placeholder="الاسم"
                onChange={(e)=>setName(()=>e.target.value)}
                />
                </p>
                <p>
                <input
                type="tel"
                placeholder="تليفون"
                onChange={(e)=>{
                  if(validatePhoneNumber(e.target.value)==false)
                  { setError(()=>'رقم الموبايل غير صحيح')}else{
                    setError('')
                  }
                  setPhone(String(e.target.value))}
                    }
                 /> 
                </p>  
                  <p>
                    خصم
                    <input
                    type="number"
                    min="0"
                    placeholder="len"
                    value={discount}
                    onChange={(e)=>{
                      setDiscount(()=>Number(e.target.value))
                      
                    }}
                    step="1"
                    />
                  </p>
                  <p>
                    سرفلة
                    <input
                    type="number"
                    min="0"
                    placeholder="len"
                    value={addition}
                    onChange={(e)=>setAddition(()=>Number(e.target.value))}
                    step="1"
                    />
                  </p>
                  <p><Error/></p>
                 
                  <button 
                  onClick={()=>setTotal((prev)=>Number(Number(prev)+(Number(addition))-Number(discount)))}
                  className='add-service'
                  >
                  اضف خصم \ سرفلة
                  </button>
                </div>     
          </div>
          <div  className="print-area container-row">
          <Print key={()=>uuidv4()} agent={name} phone={phone} total={total}  carpetsQ={carpetsjsx} />
          </div>
        </div>)
}