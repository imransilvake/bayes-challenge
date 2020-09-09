// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// app
import { reducer } from './store';

// configure store
export default configureStore({
	reducer,
	devTools: true,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})
});
