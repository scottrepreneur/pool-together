import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Lottery.module.css';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Lottery extends Component {
    state = {
        daysSaving: 30
    }
    
    componentWillMount () {
        this.props.onFetchPoolState(window.web3);
        this.props.onFetchTimeStopSplash(window.web3);
        this.props.onFetchCurrentPool(window.web3);
        this.props.onFetchCurrentApr();
        this.props.onCheckDaiAllowance(window.web3);
        this.props.onFetchEntrants(window.web3);
        this.props.onFetchDeposit(window.web3);
    }

    onEnterHandler = () => {
        this.props.history.replace("/enter");
    }

    render () {
        let lotteryValue = 0;
        if (this.props.currentApr && this.props.currentPool) {
            lotteryValue = Number(this.props.currentApr / 100 / 365 * this.state.daysSaving * this.props.currentPool).toFixed(2);
        }
        let apr = Number(this.props.currentApr).toFixed(2);
        let currentPool = Number(this.props.currentPool).toFixed(2);

        return (
            <div className={classes.Lottery}>
                <h2>A Lottery You Can't Lose!</h2>
                <div className={classes.LotteryStats}>
                    <div className={classes.Pot}>
                        <p>{lotteryValue} <span>Dai</span></p>
                        <h3>Estimated Winnings</h3>
                    </div>
                    <div className={classes.TimeRemaining}>
                        <p>{this.props.timeStopSplash} <span>Hours</span></p>
                        <h3>Entry Closes</h3>
                    </div>
                </div>
                <div>
                    <Button 
                        btnType="LottoEntry"
                        clicked={this.onEnterHandler}>Get Your Ticket!</Button>
                    <p>Learn More</p>
                </div>
                <div>
                    <p>Current Principal: {currentPool}</p>
                    <p>APR: {apr}%</p>
                    <p>Entrants: {this.props.entrants}</p>
                    <p>My Deposit: {this.props.myDeposit}</p>
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
	return {
        poolState: state.lottery.poolState,
        timeStopSplash: state.lottery.timeStopSplash,
        currentPool: state.lottery.currentPool,
        currentApr: state.lottery.currentApr,
        allowance: state.lottery.allowance,
        entrants: state.lottery.entrants,
        myDeposit: state.lottery.deposit
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onFetchPoolState: (web3) => dispatch(actions.fetchPoolState(web3)),
        onFetchTimeStopSplash: (web3) => dispatch(actions.fetchTimeStopSplash(web3)),
        onFetchCurrentPool: (web3) => dispatch(actions.fetchCurrentPool(web3)),
        onFetchCurrentApr: () => dispatch(actions.fetchCurrentApr()),
        onCheckDaiAllowance: (web3) => dispatch(actions.checkDaiAllowance(web3)),
        onFetchEntrants: (web3) => dispatch(actions.fetchEntrants(web3)),
        onFetchDeposit: (web3) => dispatch(actions.fetchDeposit(web3))
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(Lottery);