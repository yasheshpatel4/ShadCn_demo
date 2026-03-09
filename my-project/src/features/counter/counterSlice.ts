import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: function (state, action: PayloadAction<number>) {
        state.value += action.payload
    },
    decrementByAmount: function (state, action:PayloadAction<number>) {
      state.value -= action.payload
    },
    multiplyByTwo: function (state) {
      state.value *=2
    },
    divideByTwo: function (state) {
      state.value /=2;
    }
  }
})

export const { increment, decrement, incrementByAmount, decrementByAmount,multiplyByTwo,divideByTwo } = counterSlice.actions
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer