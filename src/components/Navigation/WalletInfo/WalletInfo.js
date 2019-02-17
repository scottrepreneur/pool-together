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
    if (props.network && props.address && props.balance) {
        let _address = props.address.toString()
        let address = _address.substring(_address.length - 8, _address.length);
        wallet = props.network + ' ' + address + ' ' + props.balance.toFixed(2) + ' Dai'
    }

	return (
		<span className={classes.WalletInfo}>
            {wallet}
        </span>
	);
}

export default walletInfo;