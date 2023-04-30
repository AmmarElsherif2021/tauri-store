import Hero from '../Hello/Hero/Hero'
import './bill.css'
import React from 'react'
export default function Bill(props){
    return(
        <div className='bill'>
        <h2> here props of bill will be posted,bill id, history, name of client and phone </h2>
        <Notes />
        </div>
    )
}
function Notes() {
    const backendData = [
      { title: "Grocery List", W: 0.8,L:1.2,price_m:70, createdat: "01-18-2021" ,count:1},
      { title: "Math Homework", W: 0.8,L:4.0,price_m:60, createdat: "12-01-2020" ,count:1},
      { title: "Call James", W: 0.9,L:3.0,price_m:90,createdat: "12-30-2020",count:1 }
    ]
  
    const noteRootStyle = {
      border: "2px #0af solid",
      borderRadius: 9,
      margin: 20,
      backgroundColor: "#efefef",
      padding: 6
    };
  
    return (
      <div style={{ width: 900 }}>
        {backendData.map(ele => 
          <div style={noteRootStyle}>
            <ul>
              <li>{ele.title}</li>
              <li>{`${ele.L} X ${ele.W} = ${ele.W*ele.L}`}</li>
              <li>{ele.W*ele.L*ele.price_m}</li>
              <li>{ele.count}</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
