import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './features/currencies/currenciesSlice.ts';

const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
