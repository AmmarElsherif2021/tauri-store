import React, { useState } from "react";
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";
export default function Login() {

    const [email, setEmail] = useState("");
  
    const [password, setPassword] = useState("");
  
    function validateForm() {
  
      return email.length > 0 && password.length > 0;
  
    }
  
    function handleSubmit(event) {
  
      event.preventDefault();
  
    }
  
    return (
  
      <div className="Login">
        <h1> login </h1>
        <Form onSubmit={handleSubmit} className='form'>
  
          <Form.Group size="lg" controlId="email" className='form-group'>
  
            <Form.Label className='label'>Email  </Form.Label>
  
            <Form.Control
  
              autoFocus
  
              type="email"
  
              value={email}
  
              onChange={(e) => setEmail(e.target.value)}
              
              className='input'
            />
  
          </Form.Group>
  
          <Form.Group size="lg" controlId="password" className='form-group'>
  
            <Form.Label className='label'>Password</Form.Label>
  
            <Form.Control
  
              type="password"
  
              value={password}
  
              onChange={(e) => setPassword(e.target.value)}
  
            />
  
          </Form.Group>
  
          <Button block size="lg" type="submit" disabled={!validateForm()} className='button'>
  
            Login
  
          </Button>
  
        </Form>
  
      </div>
  
    );
  
  }