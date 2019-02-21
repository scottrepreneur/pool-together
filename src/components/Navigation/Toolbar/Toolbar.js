import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import WalletInfo from '../WalletInfo/WalletInfo';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

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
			<NavigationItems closed={props.closed} />
			<WalletInfo
				loginClick = {(web3, fm) => props.loginClick(web3, fm)}
				web3={props.web3}
				fm={props.fm}
				address={props.address}
				balance={props.balance}
				network={props.network} 
			/>
		</nav>
	</header>
);

export default toolbar;