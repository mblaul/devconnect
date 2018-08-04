import axios from "axios";
import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	GET_ERRORS,
	POST_LOADING,
	DELETE_POST
} from "./types";

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

export const getPost = postId => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${postId}`)
		.then(result =>
			dispatch({
				type: GET_POST,
				payload: result.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		);
};

// Delete post
export const deletePost = postId => dispatch => {
	axios
		.delete(`/api/posts/${postId}`)
		.then(result =>
			dispatch({
				type: DELETE_POST,
				payload: postId
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add post like
export const addLike = postId => dispatch => {
	axios
		.post(`/api/posts/like/${postId}`)
		.then(result => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Remove post like
export const removeLike = postId => dispatch => {
	axios
		.post(`/api/posts/unlike/${postId}`)
		.then(result => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};
