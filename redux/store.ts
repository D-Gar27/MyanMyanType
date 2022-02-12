import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './themeSlice';
import GameReducer from './gameSlice';
import DisplayReducer from './displaySlice';
import SettingReducer from './settingSlice';
import UserReducer from './userSlice';

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    game: GameReducer,
    display: DisplayReducer,
    setting: SettingReducer,
    user: UserReducer,
  },
});

export default store;
