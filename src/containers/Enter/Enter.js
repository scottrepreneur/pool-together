import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Enter.module.css';
import * as actions from '../../store/actions/index';

class Enter extends Component {
    state = {
        controls: {
            poolAmount: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '20 Dai'
                }
            }
        }
    }

    inputChangedHandler (event, controlName) {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value
			}
		};
		this.setState({controls: updatedControls});
    }
    
    onEnterPoolHandler = () => {
		// Handle Splash Contract call
		if (this.props.allowance > 0) {
			this.props.onEnterPool(window.web3, this.state.controls.poolAmount.value);
		} else {
			this.props.onApproveDai(window.web3);
		}
	}

	componentWillMount() {
		this.props.onCheckDaiAllowance(window.web3);
	}

    render () {
        const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = <Spinner />

        let errorMessage = null
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
		}

		if (!this.props.loading) {
			form = formElementsArray.map(formElement => {
				return (<Input
					key={formElement.id}
					inputtype={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig}
					invalid={!formElement.config.valid}
					value={formElement.config.value}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => this.inputChangedHandler(event, formElement.id)} />);
			});
		}

        return (
            <div className={classes.Enter}>
                <h2>How much would you like to save?</h2>
                <p>You must save at least $20 for this pool</p>
                {errorMessage}
				<form>
					{form}
					<p>You have {Number(this.props.daiBalance).toFixed(1)} Dai.</p>
					<Button 
						btnType="LottoEntry"
						clicked={this.onEnterPoolHandler}>
						Enter the Pool
					</Button>
				</form>
				
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
		allowance: state.lottery.allowance,
		daiBalance: state.layout.daiBalance,
		error: state.lottery.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onEnterPool: (web3, amount) => dispatch(actions.enterDaiPool(web3, amount)),
		onCheckDaiAllowance: (web3) => dispatch(actions.checkDaiAllowance(web3)),
		onApproveDai: (web3) => dispatch(actions.approveDai(web3)),
		onFetchBalance: (web3) => dispatch(actions.fetchDaiBalance(web3))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Enter);