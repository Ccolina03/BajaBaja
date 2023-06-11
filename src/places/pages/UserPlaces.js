
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
              `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
            );
            console.log(responseData.bus_stops)
            setLoadedPlaces(responseData.bus_stops);
          } catch (err) {}
          
        };
        fetchPlaces();
      }, [sendRequest, userId]);


	return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && (<div className='center'>
        <LoadingSpinner/>
        </div> )}
        {loadedPlaces && !isLoading && <PlaceList items={loadedPlaces} /> }
    ;
    </React.Fragment>
    );
};

export default UserPlaces;