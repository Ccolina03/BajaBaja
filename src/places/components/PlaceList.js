import React from 'react';
import "./PlaceList.css"
import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = props => {
	if (props.items.length === 0) {
        return (
            <div className='place-list-center'>
                 <Card>
                <h2>No bus stops available. Be the first one to create one!</h2>
                <Button to='/places/new'> Create Bus Stop </Button>
                </Card>
            </div>
        );
    }
    return <ul className="place-list">
        {props.items.map(bus_stops=> <PlaceItem key={bus_stops.id} id={bus_stops.id}  title={bus_stops.title} description={bus_stops.description} address={bus_stops.address} creatorId= {bus_stops.creator} busrespect={bus_stops.busrespect} coordinates={bus_stops.location} image={bus_stops.image}/>)} {/* //Will be added soon: //coordinates={place.location} image={place.imageUrl}/>)} */}
    </ul>;
};

export default PlaceList;