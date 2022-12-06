import React from 'react';
import { useContext } from 'react';
import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from  '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom';


const NewPlace = () => {
	const auth = useContext(AuthContext)
	const {isLoading, error, sendRequest,clearError} = useHttpClient();
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
		  },
		  busrespect: {
			value: '',
			isValid: false
		  }
		},
		false
	  );

	const history= useHistory();

	const placeSubmitHandler = async event => {
		event.preventDefault();

		try {
			await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
			title: formState.inputs.title.value,
			description: formState.inputs.description.value,
			address: formState.inputs.address.value,
			busrespect: formState.inputs.busrespect.value,
			creator: auth.userId
			//future busrespect (Add 1 to users karma)
		}),
		{"Content-Type": 'application/json'}
		 );
		history.push('/');
		} catch (err) { }
		
	};

	return (

		<React.Fragment>
	<ErrorModal error={error} onClear={clearError}/>
	<form className="place-form" onSubmit={placeSubmitHandler}>
		{isLoading &&  <LoadingSpinner asOverlay/> }
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
	</React.Fragment>
	);
	
};

export default NewPlace;