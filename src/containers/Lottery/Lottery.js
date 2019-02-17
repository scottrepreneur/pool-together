import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Lottery.module.css';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Lottery extends Component {
    componentWillMount () {
        this.props.onFetchTimeStopSplash(window.web3);
        this.props.onFetchCurrentPot(window.web3);
    }

    onEnterHandler = () => {
        this.props.history.replace("/enter");
    }

    render () {
        return (
            <div className={classes.Lottery}>
                <h2>A Lottery You Can't Lose!</h2>
                <div className={classes.LotteryStats}>
                    <div className={classes.Pot}>
                        <p>{this.props.currentPot} <span>Dai</span></p>
                        <h3>Current Lottery Value</h3>
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
            </div>
            
        );
    }
}

const mapStateToProps = state => {
	return {
        currentPot: state.lottery.currentPot,
        timeStopSplash: state.lottery.timeStopSplash
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onFetchTimeStopSplash: (web3) => dispatch(actions.fetchTimeStopSplash(web3)),
        onFetchCurrentPot: (web3) => dispatch(actions.fetchCurrentPot(web3))
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(Lottery);