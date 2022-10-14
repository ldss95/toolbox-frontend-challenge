import { useEffect, useReducer, useRef } from 'react';

import { SET_SEARCH } from '../types';
import Reducer from './reducer';
import HeaderContext from './context';

const FilesState = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, { search: '' });
	const isMounted = useRef(true);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}
	}, []);

	function setSearch(search){
		if (state.search === search || !isMounted.current) {
			return;
		}

		dispatch({
			type: SET_SEARCH,
			payload: search
		});
	}

	return (
		<HeaderContext.Provider
			value={{
				setSearch,
				search: state.search,
			}}
		>
			{children}
		</HeaderContext.Provider>
	);
}

export default FilesState;
