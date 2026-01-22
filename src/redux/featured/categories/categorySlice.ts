import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { ICategory } from '@/types/Category';

type TCategoryState = {
  categories: ICategory[];
  singleCategory: ICategory | null;
};

const initialState: TCategoryState = {
  categories: [],
  singleCategory: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setSingleCategory: (state, action: PayloadAction<ICategory>) => {
      state.singleCategory = action.payload;
    }
    
  },
});

export const {
  setCategories,
  setSingleCategory,
} = categorySlice.actions;

// selectors
export const selectCategories = (state: RootState) =>
  state.category.categories;
export const selectSingleCategory = (state: RootState) =>
  state.category.singleCategory;

export default categorySlice.reducer;
