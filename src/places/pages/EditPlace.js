import React from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';

const INITIAL_DATA=[ 
    {
        id: "p1",
        title: "Samoa Stop",
        description: 'This stop is in front of a kindergarten. There is stop light to cross the street, but no proper cover from the rain.',
        imageUrl: "https://as2.ftcdn.net/v2/jpg/02/04/43/63/1000_F_204436318_P6lTrj1G3UnpGIP9C7JfN2WuQlBclbA0.jpg",
        address: 'Interseccion Av. La Molina con calle Samoa',
        location: {
            lat: -12.086158,
            lng:  -76.898019
        },
        creator: "u1"
    },
    
    {
        id: "p2",
        title: "Universidad Agraria Puerta 4 Stop",
        description: 'My first ever bus stop. In front of "rejas" and next to the soccer fields. Proper infrastructure for a bus stop.',
        imageUrl: "https://gestion.pe/resizer/ShN6wyx2fmgzbBW8d7nbNRrCZFk=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ACJCPGAFKBDSBEDR2SZADWQRPI.jpeg",
        address: 'Av. La Molina Puerta 4',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: "u2"
    }
    
    ]

 const EditPlace = () => {
    const placeId= useParams().placeId;


    const identifiedPlace = INITIAL_DATA.find(p => p.id === placeId);

    if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
         );
     }
    
     return (
        <form>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="The title is not valid. Try again."
            onInput={() => {}}
            value={identifiedPlace.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="The minimum amount of characters allowed: 5. Please try again. "
            onInput={() => {}}
            value={identifiedPlace.description}
            valid={true}
          />
          <Button type="submit" disabled={true}>
            UPDATE PLACE
          </Button>
        </form>
      );
    };
    
    export default EditPlace;