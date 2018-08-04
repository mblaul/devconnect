import {
	ADD_POST,
	DELETE_POST,
	GET_POSTS,
	GET_POST,
	POST_LOADING
} from "../actions/types";

const initialState = {
	post: {},
	posts: [],
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
				//Give back all of the post IDs except the one we just deleted.
				//This allows the post to disappear without refreshing the page.
			};

		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};

		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};

		case POST_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
};
