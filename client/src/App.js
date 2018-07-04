import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set the auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode the token and get user info and expiration
	const decoded = jwtDecode(localStorage.jwtToken);
	// Set user and isAuthenicated
	store.dispatch(setCurrentUser(decoded));
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
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
