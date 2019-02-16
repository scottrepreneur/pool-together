import React from 'react';

import classes from './WalletInfo.module.css';
import Button from '../../UI/Button/Button';

const walletInfo = (props) => {
    let wallet = <Button btnType="WalletInfo" clicked={props.loginClick}>Login</Button>;
    if (props.accountInfo) {
        wallet = props.accountInfo.address;
    }

	return (
		<div className={classes.WalletInfo}>
            {wallet}
        </div>
	);
}

export default walletInfo;