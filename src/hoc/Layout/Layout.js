import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

class Layout extends Component {
	state = {
		showSidebar: false
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

	render () {
		return (
			<Aux>
				<Toolbar 
					toggleSidebar={this.sidebarToggleHandler}/>
				<Sidebar 
					closed={this.sidebarClosedHandler}
					open={this.state.showSidebar} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}


export default Layout;