import React from 'react';
import {useState} from 'react';
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

const Auth = () => {
    const [isLoginMode, setIsLoginMode]=useState(true)
  const [formState, inputHandler] = useForm(
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
    setIsLoginMode(prevMode => !prevMode)
  }
  const authSubmitHandler = event => {  //Allow to see inputs in console
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>

      <hr/>

      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
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
    </Card>);};

export default Auth;
