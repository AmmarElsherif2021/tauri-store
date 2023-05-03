import React from 'react';
import { useState } from 'react';
import Dexie from 'dexie';


export const db = new Dexie('myDatabase');
db.version(3).stores({
  carpets: '++id, model,price_m ,W,L,size,t_price' // Primary key and indexed props
});

