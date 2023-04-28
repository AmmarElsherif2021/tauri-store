import React, { useState } from "react";
export default function Hello(){
    const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  const imgs=["/vite.svg","/tauri.svg","/vite.svg"]
  const urls=["https://vitejs.dev","https://tauri.app","https://reactjs.org"]
  return (
    
    <div className="container">
    <h1>Welcome to Tauri!</h1>

    <div className="row">
      <Card urlPath={urls[0]} imgPath={imgs[0]} />
      <Card urlPath={urls[1]} imgPath={imgs[1]} />
      <Card urlPath={urls[2]} imgPath={imgs[2]} />
    </div>

    <p>Click on the Tauri, Vite, and React logos to learn more.</p>

    <div className="row">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
    </div>

    <p>{greetMsg}</p>
    </div>
    
    
  );
}