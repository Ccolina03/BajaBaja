
import React, { useState } from 'react';
import { useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared//context/auth-context'
import "./PlaceItem.css";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showMap, setShowMap] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };
    
      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };
    
      const confirmDeleteHandler = async () => {
        setShowConfirmModal(false); //when clicked close the new Modal 
        try {
          sendRequest( `http://localhost:5000/api/places/${props.id}`, 'DELETE')
        } catch (err){

        }
        props.onDelete(props.id) //function which will be executed through prop from PlaceList.js 
      };

    return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
        <Modal show={showMap} 
            onCancel={closeMapHandler} 
            header={props.address}
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>Close </Button>}
            >
            <div className='map-container'>
                <Map center={props.coordinates} zoom={16}/>  {/* Should be props.coordinates but we writing default data for now until geocoding solved. */}
            </div>
        </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you entirely sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

        <li className='"place=item'> 
            <Card className="place-item__content">
              {isLoading && <LoadingSpinner asOverlay/>}
                <div className='place-item__image'>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className='place-item__info'>
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                    <h4> Does bus drivers respect bus stop? </h4>
                    <h2 className='respectbus'> {props.busrespect}</h2>
                </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={openMapHandler}> VIEW ON MAP</Button>
                   {auth.userId === props.creatorId && (<Button to={`/places/${props.id}`}> EDIT</Button> )}
                  {auth.userId === props.creatorId &&<Button danger onClick={showDeleteWarningHandler}> DELETE </Button>}
                </div>
            </Card>
        </li>
    </React.Fragment>
    );
};

export default PlaceItem;