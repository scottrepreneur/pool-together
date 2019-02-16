import React, { Component } from 'react';

import classes from './Lottery.module.css';
import Button from '../../components/UI/Button/Button';

class Lottery extends Component {
    render () {
        return (
            <div className={classes.Lottery}>
                <h2>A Lottery You Can't Lose!</h2>
                <div className={classes.LotteryStats}>
                    <div className={classes.Pot}>
                        <p>500.5 <span>Dai</span></p>
                        <h3>Current Lottery Value</h3>
                    </div>
                    <div className={classes.TimeRemaining}>
                        <p>32 <span>Hours</span></p>
                        <h3>Entry Closes</h3>
                    </div>
                </div>
                <div>
                    <Button btnType="LottoEntry">Get Your Ticket!</Button>
                    <p>Learn More</p>
                </div>
            </div>
            
        );
    }
}

export default Lottery;