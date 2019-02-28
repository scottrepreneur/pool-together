import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Create.module.css';
import * as actions from '../../store/actions/index';

class Create extends Component {
    state = {
        controls: {
            daiAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                },
                value: '0x4e17c87c52d0e9a0cad3fbc53b77d9514f003807',
                label: 'Dai Address'
            },
            currencies: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {'value': 'eth', 'displayValue': 'Ether'},
                        {'value': 'dai', 'displayValue': 'Dai'}
                    ]
                },
                label: 'Currencies for Pooling'
            },
            minimum: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '5 Dai'
                },
                label: 'Minimum entry amount'
            },
            timeToPool: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '7 days'
                },
                value: '7',
                label: 'Time to pool savings'
            },
            timeToSave: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '30 days'
                },
                value: '30',
                label: 'Time to accrue pool value'
            },
            timeToWithdrawal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '3 days'
                },
                value: '3',
                label: 'Time to withdraw before pool resets'
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

    createPoolHandler = () => {
        this.props.onCreatePool(window.web3);
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
                    label={formElement.config.label}
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
            <div className={classes.Create}>
                <h2>Create New Pool</h2> 
                <form>
                    {errorMessage}
                    {form}
                    <Button 
                        btnType="Success"
                        clicked={this.createPoolHandler}>
                        Create New Pool
                    </Button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
	return {
        
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onCreatePool: (web3) => dispatch(actions.createPool(web3))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);