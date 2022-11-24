import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import {useCallback, useState} from 'react';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import EditPlace from './places/pages/EditPlace';
import Auth from './user/pages/Auth.js';
import {AuthContext} from './shared/context/auth-context';
const App = () => { 

	const [isLoggedIn, setIsLoggedIn] = useState(false);


	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	const login = useCallback(() => {
		setIsLoggedIn(true);
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
	<AuthContext.Provider value = {{isLoggedIn: isLoggedIn, login:login, logout:logout}}>
	 <Router>
	  <MainNavigation />
	  <main>
	  {routes}
	   </main>
	 </Router>
	 </AuthContext.Provider>
	);
};

export default App;
