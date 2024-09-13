
import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './slice';

const store = configureStore({
  reducer: {
    yourFeature: yourReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
