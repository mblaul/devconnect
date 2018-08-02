import { ADD_POST, GET_POSTS, POST_LOADING } from "../actions/types";

const initialState = {
	post: [],
	posts: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};

		case POST_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};

		default:
			return state;
	}
};
