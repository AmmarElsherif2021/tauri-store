import React from 'react';
import { useState } from 'react';
import Dexie from 'dexie';
//import { dbPath, port } from '../enviornment'

// ...


export const db = new Dexie('myDatabase');
db.version(26).stores({
  carpets: '++id, model,price_m ,W,L,size,t_price,qty,type' // Primary key and indexed props
}).upgrade((transaction) => {
  // Migrate data from version 1 to version 2
  return transaction.table('carpets')
      .toCollection()
      // .modify((bill) => {
      //     // Modify the bill object as needed
      //     bill.name = bill.name.toUpperCase();
      //     bill.phone = bill.phone.replace(/-/g, '');
      // });
});

