import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<SidebarToggle 
			toggleSidebar={props.toggleSidebar} />
		<div className={classes.Logo}> 
			<NavLink to="/">
				<Logo />
			</NavLink>
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;