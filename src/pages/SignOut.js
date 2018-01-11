import React from 'react';
import { auth } from '../firebase/firebase';
import { Button } from 'reactstrap';

const SignOut = () =>
  <Button type="button"  onClick={auth.doSignOut}>
    Sair
  </Button>

export default SignOut;