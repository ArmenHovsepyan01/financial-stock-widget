import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  currencies: string[];
}

type CurrencyAction = {
  symbol: string;
};

const initialState: IState = {
  currencies: [],
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialState,
  reducers: {
    addCurrency: (state, action: PayloadAction<CurrencyAction>) => {
      state.currencies.push(action.payload.symbol);
    },
    removeCurrency: (state, action: PayloadAction<CurrencyAction>) => {
      state.currencies = state.currencies.filter((symbol) => symbol !== action.payload.symbol);
    },
  },
});

export const { addCurrency, removeCurrency } = currenciesSlice.actions;
export default currenciesSlice.reducer;
