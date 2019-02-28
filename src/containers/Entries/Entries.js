import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Entries.module.css';
import * as actions from '../../store/actions/index';

class Entries extends Component {
    componentWillMount () {
        this.props.onFetchCurrentPool(window.web3);
        this.props.onFetchEntries(window.web3);
    }
    
    render () {
        let entries = <p>"No Entries yet"</p>
        if (this.props.entries) {
            console.log(this.props.entries)
            //console.log(this.props.entries.length)
        }
        if (this.props.entries !== []) {
            let rows = this.props.entries.map(entry => {
                return (
                <tr key={entry.saver}>
                    <td>{entry.saver}</td>
                    <td>15</td>
                </tr>)
            })
            entries = (
                <table>
                    <thead>
                        <tr>
                            <th>Saver</th>
                            <th>Deposit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>)
        }
        return (
            <div className={classes.Entries}>
                <h2>Pool Entries</h2>
                {entries}
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
        currentPool: state.lottery.currentPool,
        entries: state.lottery.entries
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onFetchEntries: (web3) => dispatch(actions.fetchEntries(web3)),
        onFetchCurrentPool: (web3) => dispatch(actions.fetchCurrentPool(web3))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Entries);