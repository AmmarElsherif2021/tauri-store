import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewDB from '../ViewDB/ViewDB';
import './Login.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const[error,setError]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'hozifa' && password === '01006658433') {
      navigate('/ViewDB');
      //setUsername(()=>'')
      //setPassword(()=>'')
    } else {
      setError(()=>'الاسم وكلمة المرور غير صحيحين, من فضلك تأكد من ان البيانات صحيحة')
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error}
    </div>
  );
};

export default Login;
