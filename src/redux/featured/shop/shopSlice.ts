import { RootState } from '@/redux/store';
import { Shop } from '@/types/Shop';


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TShopState = {
  shops: Shop[];
};

const initialState: TShopState = {
  shops: [],
};

const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setShops: (state, action: PayloadAction<Shop[]>) => {
      state.shops = action.payload;
    },
  },
});

export const { setShops } = shopSlice.actions;

// selectors
export const selectShops = (state: RootState) => state.shops.shops;

export default shopSlice.reducer;
