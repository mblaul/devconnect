import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// Get current profile

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(result =>
			dispatch({
				type: GET_PROFILE,
				payload: result.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE, // We don't use GET_ERRORS here because it's okay if they don't have a profile
				payload: {}
			})
		);
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
