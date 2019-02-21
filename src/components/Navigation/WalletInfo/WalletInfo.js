import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './WalletInfo.module.css';
import Button from '../../UI/Button/Button';

const walletInfo = (props) => {
    let networkClasses = [classes.NetworkCircle, classes.MainnetCircle]
    if (props.network === 4) {
        networkClasses = [classes.NetworkCircle, classes.RinkebyCircle]
    }
    
    let wallet = (
        <Aux>
            <Button 
                btnType="WalletInfo"   
                clicked={() => props.loginClick(props.web3, props.fm)}>
                Login
            </Button>
        </Aux>
    );
    if (props.network && props.address) {
        let _address = props.address.toString()
        let address = _address.substring(_address.length - 8, _address.length);
        wallet = (
        <div className={classes.WalletInfo}>
            <div className={networkClasses.join(" ")}></div>
            <div className={classes.Address}>{address}</div>
        </div>
        ) 
    }

	return (
        <Aux>
            {wallet}
        </Aux>
	);
}

export default walletInfo;