import React from 'react';

import classes from './WalletInfo.module.css';
import Button from '../../UI/Button/Button';

const walletInfo = (props) => {
    let wallet = (
        <Button 
            btnType="WalletInfo"   
            clicked={() => props.loginClick(props.web3, props.fm)}>
            Login
        </Button>
    );
    if (props.address && props.balance) {
        let _address = props.address.toString()
        let address = _address.substring(_address.length - 8, _address.length);
        wallet = address + ' ' + props.balance
    }

	return (
		<div className={classes.WalletInfo}>
            {wallet}
        </div>
	);
}

export default walletInfo;