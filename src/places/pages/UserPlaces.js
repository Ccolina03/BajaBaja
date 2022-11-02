import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';


const INITIAL_DATA=[ 
{
    id: "p1",
    title: "Samoa Stop",
    description: 'This stop is in front of a kindergarten. There is stop light to cross the street, but no proper cover from the rain.',
    imageUrl: "https://as2.ftcdn.net/v2/jpg/02/04/43/63/1000_F_204436318_P6lTrj1G3UnpGIP9C7JfN2WuQlBclbA0.jpg",
    address: 'Interseccion Av. La Molina con calle Samoa',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
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


const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedplaces = INITIAL_DATA.filter(place => place.creator ===userId);
	return <PlaceList items={loadedplaces} />;
};

export default UserPlaces;