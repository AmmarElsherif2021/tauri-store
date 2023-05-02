import React from 'react';
//import Realm from 'realm';
//import {createRealmContext} from '@realm/react';
import Database from "tauri-plugin-sql-api";



async function createDB(){
    const db = await Database.load("sqlite:test.db");
    await db.execute("INSERT INTO ...");
}

export default function Carpets(){
 
  return(
    <div className='db'>
    {
      createDB
    }
    </div>
  )
}
