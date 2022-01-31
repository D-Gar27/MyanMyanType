import { createSlice } from '@reduxjs/toolkit';

export const DisplaySlice = createSlice({
  name: 'display',
  initialState: {
    display: 'game',
  },
  reducers: {
    changeDisplayArea: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { changeDisplayArea } = DisplaySlice.actions;
export default DisplaySlice.reducer;
