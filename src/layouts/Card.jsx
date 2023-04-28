import React from "react";
import './card.css'
export default function  Card(props){
    return(
        <div className="card">
        <a href={props.urlPath} target="_blank">
           <img src={props.imgPath} className="logo vite" alt="Vite logo" />
        </a>
        </div>
    )
}