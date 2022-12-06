
import React, {useState, useEffect } from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    useEffect(() => {
        const fetchPlaces = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:5000/api/places/user/${userId}`
            );
            console.log(responseData.bus_stops)
            setLoadedPlaces(responseData.bus_stops);
          } catch (err) {}
        };
        fetchPlaces();
      }, [sendRequest, userId]);

    const busStopDeleteHandler =(deletedPlaceId)=> {
      setLoadedPlaces(prevStop => prevStop.filter(bus_stop => bus_stop.id !== deletedPlaceId));
    };

      return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeleteBusStops={busStopDeleteHandler} />}
        </React.Fragment>
      );
    };
    
    export default UserPlaces;
    