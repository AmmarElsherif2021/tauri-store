import React from 'react';
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import Dexie from 'dexie';


export const archiveDB = new Dexie('myDatabase2');
archiveDB.version(28).stores({
  bills: '++id,name,phone,history,total,carpets' // Primary key and indexed props
}).upgrade((transaction) => {
  // Migrate data from version 1 to version 2
  return transaction.table('bills')
      .toCollection()
      // .modify((bill) => {
      //     // Modify the bill object as needed
      //     bill.name = bill.name.toUpperCase();
      //     bill.phone = bill.phone.replace(/-/g, '');
      // });
});
