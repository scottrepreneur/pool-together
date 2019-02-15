import React from 'react';

import classes from './SidebarToggle.module.css';

const sidebarToggle = (props) => (
	<div className={classes.SidebarToggle} onClick={props.toggleSidebar}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default sidebarToggle;