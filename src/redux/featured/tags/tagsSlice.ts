/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { ITag } from '@/types/tags';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type TTagsData = {
  data: ITag[];
  meta: any
};
type TTagsState = {
  tags: TTagsData;
  singleTag: ITag | null;
};
const initialState: TTagsState = {
  tags: {
    data: [],
    meta: {}, 
  },
  singleTag: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<TTagsData>) => {
      state.tags = action.payload;
    },
    setSingleTag: (state, action: PayloadAction<ITag>) => {
      state.singleTag = action.payload;
    },
  },
});

export const { setTags, setSingleTag } = tagsSlice.actions;

// selectors
export const selectTags = (state: RootState) => state.tags.tags;
export const selectSingleTag = (state: RootState) => state.tags.singleTag;

export default tagsSlice.reducer;
