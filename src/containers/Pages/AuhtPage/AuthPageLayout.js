import React from 'react';
import classes from './AuthPageLayout.module.css';
import AuthForm from '../../../components/AuthForm/AuthForm';
// hocs
import withLayout from '../../../hoc/with-layout';
// //////////////////////////////////////////////////////

export const AuthPageLayout = (props) => {
  return (
    <div className={classes.AuthPageLayout}>
      <main>
        <AuthForm />
      </main>
    </div>
  )
};

export default withLayout(AuthPageLayout);