
import React, {useState, useEffect} from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Users = () => {
	const [isLoading, setIsLoading]= useState(false)
	const [error, setError]= useState()
	const [savedUsers, setSavedUsers]= useState(false)
	useEffect(() => {
	  const sendingRequest = async () => { 
		setIsLoading(true);

		try {
			const response = await fetch('http://localhost:5000/api/users');
			const responseData = await response.json();

			if (!response.ok) {
				throw new Error(responseData.message)
			}
			setSavedUsers(responseData.users)
			

		} catch (err) {
			
			setError(err.message)
		}
		setIsLoading(false)
	}
	  sendingRequest();
	}, [] );

	const handlerError = () => {
		setError(null);
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