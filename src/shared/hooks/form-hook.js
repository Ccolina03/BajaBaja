import { useCallback, useReducer} from 'react';

const FormularioReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputID in state.inputs) {
				if (!state.inputs[inputID]) {
					continue;
				}
				if (inputID=== action.inputID) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputID].isValid;
				}
			}
				return {
					...state,
					inputs: {
						...state.inputs,
						[action.inputID]: {value:action.value, isValid: action.isValid}
					},
				isValid: formIsValid
				};
            case 'DATA_SET':
                return { 
                    inputs: action.inputs,
                    isValid: action.formIsValid
                }
	default:
		return state;
	}
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(FormularioReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity
	} );

    const inputHandler = useCallback((id, value, isValid) => {
		dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputID: id})

	}, [dispatch]);

    const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({
            type: "DATA_SET",
            inputs: inputData,
            formIsValid: formValidity
        });
    } , []);

    return [formState, inputHandler, setFormData];

};