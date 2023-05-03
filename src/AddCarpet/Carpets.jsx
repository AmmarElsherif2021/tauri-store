import React from 'react';
import { useState } from 'react';
import Dexie from 'dexie';


export const db = new Dexie('carpets');
db.version(1).stores({
  carpet: '++id, model, price_m ,W,L,size,t_price', // Primary key and indexed props
});

