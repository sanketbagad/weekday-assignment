import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./redux/slices/filterSlice";


// Intitializing Redux Store
const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
