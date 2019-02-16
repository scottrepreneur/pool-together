import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../Logo/Logo';
import WalletInfo from '../WalletInfo/WalletInfo';
import classes from './Sidebar.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sidebar = (props) => {
	// determine if in or out
	let attachedClasses = [classes.Sidebar, classes.Close];
	if (props.open) {
		attachedClasses = [classes.Sidebar, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}>
					<NavLink to="/">
						<Logo />
					</NavLink>
				</div>
				<nav>
					<WalletInfo 
						loginClick = {(web3, fm) => props.loginClick(web3, fm)}
						web3={props.web3}
						fm={props.fm}
						address={props.address}
						balance={props.balance}
						network={props.network} 
					/>
				</nav>
			</div>
		</Aux>
	);
}

export default sidebar;