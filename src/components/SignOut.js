import React from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
  <a  onClick={auth.doSignOut}>
    Sair
  </a>

export default SignOutButton;