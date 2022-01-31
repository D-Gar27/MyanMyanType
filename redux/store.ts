import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './themeSlice';
import GameReducer from './gameSlice';
import DisplayReducer from './displaySlice';
import SettingReducer from './settingSlice';

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    game: GameReducer,
    display: DisplayReducer,
    setting: SettingReducer,
  },
});

export default store;
