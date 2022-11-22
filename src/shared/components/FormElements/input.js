import React, {useReducer, useEffect} from 'react';
import './Input.css';

import {validate} from '../../components/util/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state 
          ,value: action.val ,
          isValid: validate(action.val, action.validators)
        };
      case 'CLICK': {
        return {
            ...state,
            isClicked: true
        }
      }
        default:
        	return state;
    }
};


const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value:props.initialValue || "",
        isValid: props.initialValid || false,
        isClicked: false
    });

    const {id, onInput} = props;
    const {value, isValid}=inputState
    useEffect(()=> 
        {onInput(id, value, isValid)} 
        ,  [id, value, isValid, onInput]  );

    const changeHandler = event => {
        dispatch ({type: 'CHANGE', val: event.target.value, validators:props.validators});

    };

    const clickHandler = () => {
        dispatch({
            type: "CLICK"
        });
    };

    const element = props.element === 'input' ?
     (<input id = {props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} value={inputState.value} onBlur={clickHandler}/> 
     
     ): 

     (<textarea id = {props.id} rows={props.rows || 3} onChange={changeHandler} value={inputState.value} onBlur={clickHandler}/>
     );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isClicked && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isClicked && <p>{props.errorText}</p>}
    </div>
    );
};

export default Input;