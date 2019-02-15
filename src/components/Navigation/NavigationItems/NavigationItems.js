import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem onClickHandler={props.closed} link="/lottery">Lottery</NavigationItem>
		</ul>	
	);
}

export default navigationItems;