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
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode]=useState(true);
   
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
   
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
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          JSON.stringify({
            name1: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
        try { const responseData =await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST', 
        JSON.stringify({
          email: formState.inputs.email.value, 
          password: formState.inputs.password.value}),
          {
            'Content-Type': 'application/json'
          },
        );
  auth.login(responseData.user.id);
} catch (err) {    }
  }
  };

  const handlerError = () => {
    clearError();
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
