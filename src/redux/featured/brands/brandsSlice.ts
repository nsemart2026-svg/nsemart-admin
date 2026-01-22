import { RootState } from '@/redux/store';
import { IBrand } from '@/types/brands';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TBrandState = {
  brands: IBrand[];
};

const initialState: TBrandState = {
  brands: [],
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<IBrand[]>) => {
      state.brands = action.payload;
    },
  },
});

export const { setBrands } = brandSlice.actions;

// selectors
export const selectBrands = (state: RootState) => state.brands.brands;

export default brandSlice.reducer;
