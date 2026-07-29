// src/components/Register.jsx
import React, { useState } from 'react';
import { apiFetch } from '../lib/api';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  // 👈 JS logic goes inside functions like this
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await apiFetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your JSX UI */}
    </form>
  );
}