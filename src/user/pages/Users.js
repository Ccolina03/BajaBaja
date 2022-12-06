
import React, {useState, useEffect} from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
	const [savedUsers, setSavedUsers]= useState(false)
	
	useEffect(() => {
	  const sendingRequest = async () => { 
	
		try {
			const responseData = await sendRequest('http://localhost:5000/api/users');
			
			setSavedUsers(responseData.users)
			

		} catch (err) {
		//error managed in Http-Hook
		}
	}
	  sendingRequest();
	}, [sendRequest] );

	const handlerError = () => {
		clearError();
	};

	

	return (
		<React.Fragment> 
			<ErrorModal error={error} onClear={handlerError}/> 
			{isLoading && (<div className='center'>
				<LoadingSpinner/>
				</div>)}
			
			{!isLoading && savedUsers && <UsersList items={savedUsers} /> }
		</React.Fragment>);
};

export default Users;