import React from "react";
import './card.css'
import { invoke } from '@tauri-apps/api/tauri';
export default function  Card(props){
    function handleClick() {
        invoke('open', {
          uri: 'https://example.com',
          options: {
            newWindow: false,
            switchTabs: false,
          },
        });
      }
    return(
        <div className="card" onClick={handleClick
        }>
        <a href={props.urlPath} target="_blank">
           <img src={props.imgPath} className="card-img" alt="Vite logo" />
        </a>
        </div>
    )
}