import React, { useContext } from 'react';
import {useState} from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode]=useState(true);
    const [error, setError] =useState()//initially undefined
    const [isLoading, setIsLoading] =useState(false);
   
    const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
        setFormData({
            ...formState.inputs,
            name: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
        setFormData({
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }

        }, false);
    }
    setIsLoginMode(prevMode => !prevMode)
  }
  const authSubmitHandler = async event => {  //Allow to see inputs in console
    event.preventDefault();

    if (!isLoginMode) { 
      setIsLoading(true)
      try { 

        const response = await fetch('http://localhost:5000/api/users/signup', {method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name1:formState.inputs.name.value,
      email: formState.inputs.email.value, 
      password: formState.inputs.password.value})
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  console.log(responseData)
  setIsLoading(false)
  auth.login();

      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setError(err.message || "SIGNUP went wrong. Try again later.")
      }
    } else {
      
    }

    
  };

  const handlerError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={handlerError}/>
    <Card className="authentication">
      {isLoading &&<LoadingSpinner asOverlay={true}/>}
      <h2>Login Required</h2>

      <hr/>

      <form onSubmit={authSubmitHandler}>
        {!isLoginMode 
        && (
        <Input
            element="input" id="name"
            type="text" label="Your Name"
            validators={[VALIDATOR_REQUIRE()]} errorText="Add a name."
            onInput={inputHandler} />
        )}

        <Input element="input"
          id="email" type="email"
          label="E-Mail" validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />

        <Input
          element="input" id="password"
          type="password" label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form> 
      <Button inverse onClick={switchModeHandler}> No account? {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>
    </Card>
    </React.Fragment>);};

export default Auth;
