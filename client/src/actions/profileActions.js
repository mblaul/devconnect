import axios from "axios";

import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(result => {
			dispatch({
				type: GET_PROFILE,
				payload: result.data
			});
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILE, // We don't use GET_ERRORS here because it's okay if they don't have a profile
				payload: {}
			})
		);
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("/api/profile", profileData)
		.then(result => history.push("./dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		axios
			.delete("/api/profile")
			.then(result => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				});
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
