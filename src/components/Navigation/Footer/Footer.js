import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Footer.module.css'

const footer = (props) => {

	return (
        <div className={classes.Footer}>
            <div className={classes.Copyright}>
                c Power Dai
            </div>
            <div className={classes.Links}>
                <NavLink to="/contact">Contact Support</NavLink>
            </div>
        </div>
	);
}

export default footer;