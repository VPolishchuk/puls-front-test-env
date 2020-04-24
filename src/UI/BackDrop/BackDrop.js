import React from 'react';
import classes from './BackDrop.module.css'

const BackDrop = props => <div onClick={props.onClick} className={classes.BackDrop}/>;

export default BackDrop;