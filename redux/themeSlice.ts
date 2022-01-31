import { createSlice } from '@reduxjs/toolkit';

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: '#222831',
    primary: '#94d2bd',
    highlight: '#52b788',
    lightDark: '#323f52',
    incorrect: '#fe2712',
    correct: '#2dc653',
  },
  reducers: {
    restoreLastTheme: (state, action) => {
      state.dark = action.payload.dark;
      state.primary = action.payload.primary;
      state.highlight = action.payload.highlight;
      state.lightDark = action.payload.lightDark;
    },
    changeTheme: (state, action) => {
      state.dark = action.payload.dark;
      state.primary = action.payload.primary;
      state.highlight = action.payload.highlight;
      state.lightDark = action.payload.lightDark;
    },
  },
});

export const { changeTheme, restoreLastTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
