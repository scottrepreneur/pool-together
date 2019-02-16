import React, { Component } from 'react';
import { connect } from 'react-redux';

import Fortmatic from 'fortmatic';
import Web3 from 'web3';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Footer from '../../components/Navigation/Footer/Footer';
import * as actions from '../../store/actions/index';

class Layout extends Component {
	state = {
		showSidebar: false,
		accountInfo: null
	}

	handleStateChange (state) {
		this.setState({menuOpen: state.isOpen})  
	}

	sidebarClosedHandler = () => {
		this.setState({showSidebar: false});
	}

	sidebarToggleHandler = () => {
		this.setState( (prevState) => {
			return {showSidebar: !prevState.showSidebar}
		});
	}

	setUserInfo = (web3, fm) => {
		this.props.onFetchAccountInfo(web3, fm)
	};

	loginHandler = async (web3, fm) => {
		let accounts = await fm.user.login();
		if (accounts.length > 0) {
			this.setUserInfo(web3, fm);
		  }
	}

	componentWillMount() {
		const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY);

		// Post EIP-1102 update which MetaMask no longer injects web3
		if (window.ethereum) {
			// Use MetaMask provider
			window.web3 = new Web3(window.ethereum);
		} else {
			// Use Fortmatic provider
			window.web3 = new Web3(fm.getProvider());
		}

		// Legacy dApp browsers which web3 is still being injected
		if (typeof web3 !== 'undefined') {
			// Use injected provider
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			// Use Fortmatic provider
			window.web3 = new Web3(fm.getProvider());
		}
	}

	render () {
		return (
			<div className={classes.Layout}>
				<Toolbar 
					toggleSidebar={this.sidebarToggleHandler}
					loginClick={this.loginHandler}
					accountInfo={this.state.accountInfo} />
				<Sidebar 
					closed={this.sidebarClosedHandler}
					open={this.state.showSidebar}
					loginClick={this.loginHandler}
					accountInfo={this.state.accountInfo} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		accountInfo: state.lottery.accountInfo,
		web3: state.lottery.web3
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchAccounInfo: (web3) => dispatch(actions.fetchAccountInfo(web3)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);