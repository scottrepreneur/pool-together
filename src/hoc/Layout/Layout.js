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
		balance: null,
		address: null
	}
	fm = null;
	accounts = null;

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

	loginHandler = async (web3, fm) => {
		const {user} = fm
		if (!user) {
			throw new Error("no user!");
		}
		let accounts = await user.login()
		this.setState({
			...this.state,
			account: accounts[0]
		});
		if (this.state.account) {
			this.props.onFetchAddress(web3);
			this.props.onFetchBalance(fm);
		}
	}

	componentWillMount() {
		this.fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY);
		window.web3 = new Web3(this.fm.getProvider());
	}

	render () {
		return (
			<div className={classes.Layout}>
				<Toolbar 
					toggleSidebar={this.sidebarToggleHandler}
					loginClick={(web3, fm) => this.loginHandler(web3, fm)}
					address={this.props.address}
					balance={this.props.balance}
					web3={window.web3}
					fm={this.fm}  />
				<Sidebar
					closed={this.sidebarClosedHandler}
					open={this.state.showSidebar}
					loginClick={(web3, fm) => this.loginHandler(web3, fm)}
					address={this.props.address}
					balance={this.props.balance}
					web3={window.web3}
					fm={this.fm} />
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
		address: state.lottery.address,
		balance: state.lottery.balance
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchAddress: (web3) => dispatch(actions.fetchAddress(web3)),
		onFetchBalance: (fm) => dispatch(actions.fetchBalance(fm))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);