import React from 'react';
import Logo from '../../UI/Logo/Logo';
import classes from './Loader.module.css';
//////////////////////////////////////////

export const Loader = () => (
	<div className={classes.Lds}>
		<div/><div/><div/>
	</div>
)
const LoaderBox = ({ showLoader }) => (
	<div className={classes.Preloader}>
		<div>
			<Logo />
		</div>
		<Loader />
	</div>
);

export default LoaderBox;
