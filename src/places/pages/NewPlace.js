import React from 'react';
import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from  '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';



const NewPlace = () => {
 	const [formState, inputHandler] = useForm(
		{
		  title: {
			value: '',
			isValid: false
		  },
		  description: {
			value: '',
			isValid: false
		  },
		  address: {
			value: '',
			isValid: false
		  }
		},
		false
	  );

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
		<Input id="busrespect" element = "input" label ="Bus stop respected? (True/False)" 
		validators={[VALIDATOR_REQUIRE()]}
		errorText="Please enter a valid answer."
		onInput={inputHandler}/>

		
		<Button type="submit" disabled={!formState.isValid}> ADD BUS STOP  </Button>
	</form>
};

export default NewPlace;