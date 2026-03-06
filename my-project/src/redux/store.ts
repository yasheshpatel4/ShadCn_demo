import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toDoReducer from '../features/todo/reducer'; 
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  toDo: toDoReducer,
  products: productReducer 
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
