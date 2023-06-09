import React from 'react'
import { Box, Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import {auth} from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";



const Signup = ({handleClose}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {setAlert} = CryptoState();


  const handleSubmit = async () => {
  if (password !== confirmPassword) {
     setAlert({
      open: true,
      message: 'Check Password',
      type: 'error',
     });
     return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setAlert({
      open: true, message: `Sign Up Successful. Welcome ${result.user.email}`,
  type: 'sucess',});

  handleClose()
  } catch (error) {
     setAlert({
      open: true,
      message: error.message,
      type: 'error',
     });
  }
  };
  return (
    <Box
    p={3}
    style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
    <TextField 
    variant='outlined'
    type='email'
    label='Enter Email'
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    fullWidth
    />
    <TextField 
    variant='outlined'
    type='password'
    label='Enter Password'
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    fullWidth
    />
    <TextField 
    variant='outlined'
    type='password'
    label='Confirm Password'
    value={confirmPassword}
    onChange={(e)=> setConfirmPassword(e.target.value)}
    fullWidth
    />
    <Button variant='contained' size='large' style={{backgroundColor: 'teal'}} onClick={handleSubmit}>
      Sign up
    </Button>
    </Box>
  )
}

export default Signup