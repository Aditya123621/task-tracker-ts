import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import drawerReducer from "./slices/drawerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    drawer: drawerReducer,
  },
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
