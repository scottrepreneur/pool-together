import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
	<button 
		className={[classes.Button, classes[props.btnType]].join(' ')}
		onClick={props.clicked}
		disabled={props.disabled}> {props.children} </button>
);

export default button;