import React from 'react';
import { useState, useEffect } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import Dexie from 'dexie';


export const archiveDB = new Dexie('myDatabase');
archiveDB.version(8).stores({
  bills: '++id,name,phone,history,total,carpets' // Primary key and indexed props
});