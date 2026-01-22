import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "@/redux/featured/auth/authSlice";
import productReducer from '@/redux/featured/products/productSlice';
import categoryReducer from '@/redux/featured/categories/categorySlice';
import tagsReducer from '@/redux/featured/tags/tagsSlice';
import attributeReducer from "@/redux/featured/attribute/attributeSlice";
import brandsReducer from '@/redux/featured/brands/brandsSlice'
import shopsReducer from '@/redux/featured/shop/shopSlice'
import {
  PERSIST,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  products: productReducer,
  category: categoryReducer,
  tags: tagsReducer,
  brands: brandsReducer,
  shops: shopsReducer,
  attributes: attributeReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);