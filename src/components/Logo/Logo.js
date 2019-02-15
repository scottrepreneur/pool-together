import React from 'react';

import powerDaiLogo from '../../assets/img/power-dai-logo.png';
import classes from './Logo.module.css'

const logo = (props) => (
	<div className={classes.Logo} style={{height: props.height}}>
		<img src={powerDaiLogo} alt="Power Dai Logo" />
	</div>
);

export default logo;