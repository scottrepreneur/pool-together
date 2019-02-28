import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem onClickHandler={props.closed} link="/create">Create</NavigationItem>
			<NavigationItem onClickHandler={props.closed} link="/manage">Manage</NavigationItem>
			<NavigationItem onClickHandler={props.closed} link="/entries">Entries</NavigationItem>
		</ul>	
	);
}

export default navigationItems;