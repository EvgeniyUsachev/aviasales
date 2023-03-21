import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { checkboxNames } from '../utls/checkboxNames';

const checkedList = new Array(checkboxNames.length).fill(true);

interface CheckBoxState {
  checkedState: boolean[];
  cheapSort: boolean;
  fastSort: boolean;
  optimalSort: boolean;
}

const initialState: CheckBoxState = {
  checkedState: checkedList,
  cheapSort: true,
  fastSort: false,
  optimalSort: false,
};

const checkBoxSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    setChecked(state, action: PayloadAction<number>) {
      state.checkedState[action.payload] = !state.checkedState[action.payload];
    },
    setCheckedAll(state, action: PayloadAction<number>) {
      if (action.payload === 0 && state.checkedState[0] === true) {
        state.checkedState.fill(true);
      } else if (action.payload === 0 && state.checkedState[0] === false) {
        state.checkedState.fill(false);
      }
      if (state.checkedState.slice(1).every((el) => el === true)) {
        state.checkedState[0] = true;
      } else if (!state.checkedState.slice(1).every((el) => el === true)) {
        state.checkedState[0] = false;
      }
    },
    setCheapSorting(state) {
      state.cheapSort = true;
      state.fastSort = false;
      state.optimalSort = false;
    },
    setFastSorting(state) {
      state.cheapSort = false;
      state.fastSort = true;
      state.optimalSort = false;
    },
    setOptimalSorting(state) {
      state.cheapSort = false;
      state.fastSort = false;
      state.optimalSort = true;
    },
  },
});

export const { setChecked, setCheckedAll, setCheapSorting, setFastSorting, setOptimalSorting } = checkBoxSlice.actions;

export default checkBoxSlice.reducer;
