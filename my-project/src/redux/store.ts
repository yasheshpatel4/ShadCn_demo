import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toDoReducer from '../features/todo/reducer'; 
import counterReducer from '../features/counter/counterSlice';

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
