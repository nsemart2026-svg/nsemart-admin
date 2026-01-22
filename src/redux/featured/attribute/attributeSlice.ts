/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { IAttribute } from "@/types/attribute";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AttributesData {
  data: IAttribute[];
  meta: any;
}

type TAttributeState = {
  attributes: AttributesData;
  singleAttribute: IAttribute | null;
};

const initialState: TAttributeState = {
  attributes: {
    data: [],
    meta: {},
  },
  singleAttribute: null,
};

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    setAttributes: (state, action: PayloadAction<AttributesData>) => {
      state.attributes = action.payload;
    },
    setSingleAttribute: (state, action: PayloadAction<IAttribute>) => {
      state.singleAttribute = action.payload;
    },
  },
});

export const { setAttributes, setSingleAttribute } = attributeSlice.actions;

// selectors
export const selectAttributes = (state: RootState) =>
  state.attributes.attributes;
export const selectSingleAttribute = (state: RootState) =>
  state.attributes.singleAttribute;

export default attributeSlice.reducer;
