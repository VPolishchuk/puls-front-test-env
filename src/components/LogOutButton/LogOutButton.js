import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import { AuthContext } from '../../firebase-auth';
import classes from './LogOutButton.module.css';
import app from '../../firebase-config';
const LogOutButton = ({  }) => {
  const { currentUser } = useContext(AuthContext);

  let admin = false;
  if (currentUser) {
    admin = true;
  } else {
    return null;
  }
 return (
   <div className={classes.ButtonWrap}>
        <Button onClick={() => app.auth().signOut()}>Log Out</Button>
   </div>
 )
};

export default LogOutButton