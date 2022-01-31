import { createSlice } from '@reduxjs/toolkit';

const SettingSlice = createSlice({
  name: 'setting',
  initialState: {
    level: 'normal',
    webLang: 'eng',
    number: false,
  },
  reducers: {
    changeSetting: (state, action) => {
      state.level = action.payload.level;
      state.webLang = action.payload.webLang;
      state.number = action.payload.number;
    },
  },
});

export const { changeSetting } = SettingSlice.actions;

export default SettingSlice.reducer;
