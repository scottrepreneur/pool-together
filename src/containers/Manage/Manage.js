import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Manage.module.css';
import * as actions from '../../store/actions/index';

class Manage extends Component {
    componentWillMount() {
        this.props.onFetchPoolState(window.web3);
        this.props.onFetchManager(window.web3);
        this.props.onFetchCurrentPool(window.web3);
        this.props.onFetchCurrentApr(window.web3);
        this.props.onFetchEntrants(window.web3);
    }

    earnInterestHandler = () => {
        this.props.onEarnInterest(window.web3);
    }

    pickWinnerHandler = () => {
        this.props.onPickWinner(window.web3);
    }

    restartPoolHandler = () => {
        this.props.onRestartPool(window.web3);
    }

    render () {
        let poolState = "Open for Savings!";
        if (this.props.poolState === 1) {
            poolState = "Compounding Winnings!"
        }
        if (this.props.poolState === 2) {
            poolState = "Ready to withdrawal savings"
        }
        return (
            <div className={classes.Manage}>
                <h2>Manage Savings</h2>
                <p>This pool's contract: {' '}
                    <a href={'http://rinkeby.etherscan.io/address/' + process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS}>
                        {process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS}
                    </a>
                </p>
                <p>This pool is managed by: {this.props.manager}</p>
                <p>Pool State: {poolState}</p>
                
                <Button btnType="Manage" clicked={this.earnInterestHandler}>Earn Interest</Button>
                <Button btnType="Manage" clicked={this.pickWinnerHandler}>Pick Winner</Button>
                <Button btnType="Inactive" clicked={this.restartPoolHandler}>Restart Pool</Button>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
        poolState: state.lottery.poolState,
        currentPool: state.lottery.currentPool,
        currentApr: state.lottery.currentApr,
        entrants: state.lottery.entrants,
        manager: state.manage.manager
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onFetchPoolState: (web3) => dispatch(actions.fetchPoolState(web3)),
        onFetchCurrentPool: (web3) => dispatch(actions.fetchCurrentPool(web3)),
        onFetchCurrentApr: () => dispatch(actions.fetchCurrentApr()),
        onFetchEntrants: (web3) => dispatch(actions.fetchEntrants(web3)),
        onFetchManager: (web3) => dispatch(actions.fetchManager(web3)),
        onEarnInterest: (web3) => dispatch(actions.earnInterest(web3)),
        onPickWinner: (web3) => dispatch(actions.pickWinner(web3)),
        onRestartPool: (web3) => dispatch(actions.restartPool(web3))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);