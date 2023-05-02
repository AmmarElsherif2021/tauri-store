import React from 'react';
import { useState } from 'react';
import Dexie from 'dexie';
const db = new Dexie('myDatabase');
db.version(1).stores({
  friends: '++id, name, age', // Primary key and indexed props
});
export default function Carpets({defaultAge} = {defaultAge: 21}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState("");

  async function addFriend() {
    try {

      // Add the new friend!
      const id = await db.friends.add({
        name,
        age
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName("");
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <div>
    <p>
      {status}
    </p>
    Name:
    <input
      type="text"
      value={name}
      onChange={ev => setName(ev.target.value)}
    />
    Age:
    <input
      type="number"
      value={age}
      onChange={ev => setAge(Number(ev.target.value))}
    />
    
    <button onClick={addFriend}>
      Add
    </button>
    </div>
  )
}