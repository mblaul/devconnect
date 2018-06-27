import axios from "axios";
import { GET_ERRORS } from "./types";

//Register
export const registerUser = userData => dispatch => {
	axios
		.post("/api/users/register", userData)
		.then(result => console.log(result.data))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};