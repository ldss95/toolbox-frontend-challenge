import { SET_SEARCH } from '../types';

function reducer(state, action) {
	switch(action.type){
		case SET_SEARCH: 
			return {
				...state,
				search: action.payload
			}
		default:
			return state;
	}
}

export default reducer;