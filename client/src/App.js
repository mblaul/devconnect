import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set the auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode the token and get user info and expiration
	const decoded = jwtDecode(localStorage.jwtToken);
	// Set user and isAuthenicated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout the user
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							{/* Switch allows redirects on private routes */}
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
