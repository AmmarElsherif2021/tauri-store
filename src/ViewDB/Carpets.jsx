import React from 'react';
import { useState } from 'react';
import Dexie from 'dexie';


export const db = new Dexie('myDatabase');
db.version(9).stores({
  carpets: '++id, model,price_m ,W,L,size,t_price,qty,type' // Primary key and indexed props
});

