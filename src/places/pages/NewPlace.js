import React, { useCallback, useReducer} from 'react';
import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from  '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';

const FormularioReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputID in state.inputs)
				if (inputID=== action.inputID) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputID].isValid;
				}
				return {
					...state,
					inputs: {
						...state.inputs,
						[action.inputID]: {value:action.value, isValid: action.isValid}
					},
				isValid: formIsValid
				};
	default:
		return state;
	}
};

const NewPlace = () => {
	const [formState, dispatch] = useReducer(FormularioReducer, {
		inputs: {
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			},
		},
		isValid: false
	} );
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputID: id})

	}, [dispatch]);

	const placeSubmitHandler = event => {
		event.preventDefault();
		console.log(formState.inputs);

	};

	return <form className="place-form" onSubmit={placeSubmitHandler}>
		<Input id="title" element = "input" label ="Title" 
		validators={[VALIDATOR_REQUIRE()]}
		errorText="Please enter a valid bus stop name"
		onInput={inputHandler}/>
		<Input id="description" element = "textarea" label ="Description" 
		validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
		errorText="Please enter a valid description for the bus stop (5 characters minimum)."
		onInput={inputHandler}/>
		<Input id="address" element = "input" label ="Address" 
		validators={[VALIDATOR_REQUIRE()]}
		errorText="Please enter a valid address for the bus stop."
		onInput={inputHandler}/>
		<Input id="reference" element = "input" label ="References/Nickname" 
		validators={[VALIDATOR_REQUIRE()]}
		errorText="Please enter a valid reference place."
		onInput={inputHandler}/>

		
		

		<Button type="submit" disabled={!formState.isValid}> ADD BUS STOP  </Button>
	</form>
};

export default NewPlace;