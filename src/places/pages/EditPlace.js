import React from 'react';
import { useEffect, useState, useContext } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import './NewPlace.css'; //same for CSS stye for this update form to the New Bus Stop file

import Card from '../../shared/components/UIElements/Card';
import {useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext} from '../../shared/context/auth-context';


 const EditPlace = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState()
    
    const auth = useContext(AuthContext);
    const placeId= useParams().placeId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlaces(responseData.bus_stop);
        setFormData(
          {
            title: {
              value: responseData.bus_stop.title,
              isValid: true
            },
            description: {
              value: responseData.bus_stop.description,
              isValid: true
            }
          },
          true
        );
      
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

   
    

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
          await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'PATCH', 
        JSON.stringify({
          title: formState.inputs.title.value, 
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
        );
        history.push('/' + auth.userId +'/places');
        } catch (err) {

        }

    };


    if (isLoading) {
        return (
            <div className='center'>
               <LoadingSpinner/>
            </div>
        );
     }
    

    if (!loadedPlaces && !error ) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find place!</h2>
        </Card>
      </div>
         );
     }

     

     return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
       {!isLoading && loadedPlaces && (  
       <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="The title is not valid. Try again."
            onInput={inputHandler}
            initialValue={loadedPlaces.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="The minimum amount of characters allowed: 5. Please try again. "
            onInput={inputHandler}
            initialValue={loadedPlaces.description}
            initialValid={true}
          />E
          <Button type="submit" disabled={!formState.isValid}>
            Edit Bus Stop
          </Button>
        </form>)}
        </React.Fragment>
      );
    };
    
    export default EditPlace;
