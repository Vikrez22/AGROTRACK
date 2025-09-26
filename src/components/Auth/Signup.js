// src/components/Auth/Signup.jsx
import React, { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        role: role,
        email: user.email,
      });

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="text-center mt-20 container bg-green-100 p-10 rounded-lg shadow-md">
      <h1>404 Erorr</h1><br/>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the <a href="/">home page</a>.</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Go Back
      </button>

      {/* <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="herder">Herder</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Sign Up</button>
      </form> */}
    </div>
  );
};

export default Signup;
