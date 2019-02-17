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
        return (
            <div className={classes.Entries}>
                <h2>My Entries</h2>
                {this.props.entries}
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

export default connect(mapStateToProps,mapDispatchToProps)(Entries);