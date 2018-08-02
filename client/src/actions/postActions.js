import axios from "axios";
import { ADD_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from "./types";

// Add post
export const addPost = postData => dispatch => {
	axios
		.post("/api/posts", postData)
		.then(result =>
			dispatch({
				type: ADD_POST,
				payload: result.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get("/api/posts")
		.then(result =>
			dispatch({
				type: GET_POSTS,
				payload: result.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};
