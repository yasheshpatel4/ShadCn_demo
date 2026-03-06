import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toDoReducer from '../features/reducer'; 
import counterReducer from '../features/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  toDo: toDoReducer 
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
