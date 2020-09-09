// react-redux
import { TypedUseSelectorHook, useSelector as useSelectorUntyped } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

// app
import { State } from '../../types';

// initial state
const initialState: State = {
	matches: {},
	token: '',
	page: 0,
	loading: false,
	finished: false,
	filters: []
};

// memory slice
export const { reducer, actions } = createSlice({
	name: 'memory',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		addMatches: (state, action) => {
			state.matches = { ...state.matches, ...action.payload };
		},
		nextPage: (state) => {
			state.page = state.page + 1;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setFinished: (state, action) => {
			state.finished = action.payload;
		},
		applyFilters: (state, action) => {
			state.filters = action.payload;
		},
		archiveMatch: (state, action) => {
			state.matches = {
				...state.matches,
				[action.payload.id]: action.payload
			};
		}
	}
});

// hook: useDispatch
export { useDispatch } from 'react-redux';

// hook: useSelector
export const useSelector: TypedUseSelectorHook<State> = useSelectorUntyped;
