import React, { useContext, } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from "react-router";
// features
import app from "../../firebase-config";
import Button from '../../UI/Button/Button';
import { AuthContext } from '../../firebase-auth';
// ui
import classes from './AuthForm.module.css';
// ///////////////////////////////////////////////////////

const AuthForm = (props) => {
  const { history } = props;
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/"/>;
  }
  return (
    <div className={classes.Layout}>
      <Formik
        validationSchema={Yup.object({
          email: Yup.string()
            .email('must be email')
            .required('Required'),
          password: Yup.string()
            .required('Required'),
        })
      }
        initialValues={{
          email: '',
          password: ''
      }}
        onSubmit={(values) => {
          const { email, password } = values;
            const login = async () => {
              try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email, password);
                history.push("/");
              } catch (error) {
                alert(error);
              }
            }
            login()
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} autoComplete="off" >
            <p>Welcome</p>
            <label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              {props.errors.name && <div>{props.errors.name}</div>}
            </label>
            <label>
              <input
                type="password"
                autoComplete="off"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="password"
              />
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            </label>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </div>
)};

export default AuthForm;