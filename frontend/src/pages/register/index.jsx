import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import styles from '@styles/form.module.css';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    phone_number: '',
    password: ''
  });
  const [error, setError] = useState({
    name: null,
    phone_number: null,
    password: null
  });

  const { register } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(values, (err) => {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
        if (error.name) {
          setError((prev) => ({ ...prev, name: error.name }));
        }
        if (error.phone_number) {
          setError((prev) => ({ ...prev, phone_number: error.phone_number }));
        }
        if (error.password) {
          setError((prev) => ({ ...prev, password: error.password }));
        }
      });
    });
  };

  const Inputs = [
    {
      id: 'name',
      label: 'Your Name',
      type: 'text',
      value: values.name,
      isValid: error.name,
      onChange: handleChange('name')
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      type: 'tel',
      value: values.phone_number,
      isValid: error.phone_number,
      onChange: handleChange('phone_number')
    },
    {
      id: 'password',
      label: 'New Password',
      type: 'password',
      value: values.password,
      isValid: error.password,
      onChange: handleChange('password')
    }
  ];

  useEffect(() => {
    return () => {
      setValues({
        name: '',
        phone_number: '',
        password: ''
      });
      setError({
        name: null,
        phone_number: null,
        password: null
      });
    };
  }, []);
  return (
    <div className={styles['register-page']}>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit} className={styles['form']}>
        {Inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
        <button type='submit'>Register</button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};
export default Register;
