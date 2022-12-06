import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import {useCallback, useState} from 'react';

import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

//import Users from './user/pages/Users';
//import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation';
//import UserPlaces from './places/pages/UserPlaces';
//import EditPlace from './places/pages/EditPlace';
//import Auth from './user/pages/Auth.js';
import {AuthContext} from './shared/context/auth-context';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace=React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces=React.lazy(() => import('./places/pages/UserPlaces'));
const EditPlace=React.lazy(() => import('./places/pages/EditPlace'));
const Auth=React.lazy(() => import('./user/pages/Auth.js'));

const App = () => { 
  const [userId, setUserId] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  

	const logout = useCallback(() => {
		setIsLoggedIn(false);
    setUserId(null);
	}, []);

	const login = useCallback((uid) => {
		setIsLoggedIn(true);
    setUserId(uid);
	}, []);

	let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <EditPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
	return (
	<AuthContext.Provider value = {{isLoggedIn: isLoggedIn, login:login, logout:logout, userId}}>
	 <Router>
	  <MainNavigation />
	  <main> 
      <Suspense fallback={<div className='center'><LoadingSpinner/></div>}>
	  {routes}
    </Suspense>
	   </main>
	 </Router>
	 </AuthContext.Provider>
	);
};

export default App;
