import { createSlice } from '@reduxjs/toolkit';

export const GameSlice = createSlice({
  name: 'game',
  initialState: {
    started: false,
    finished: false,
    time: 30,
    restart: false,
    endOfText: 0,
    accuracy: 'None',
  },
  reducers: {
    startTheGame: (state, action) => {
      state.started = true;
    },
    finishGame: (state, action) => {
      state.finished = true;
    },
    restartGame: (state, action) => {
      state.finished = false;
      state.started = false;
      state.restart = true;
      state.endOfText = 0;
    },
    toRestartGame: (state, action) => {
      state.restart = false;
    },
    setGameTime: (state, action) => {
      state.time = action.payload;
    },
    lineEnd: (state, action) => {
      state.endOfText += 1;
    },
    setAccuracy: (state, action) => {
      state.accuracy = action.payload;
    },
  },
});

export const {
  startTheGame,
  finishGame,
  restartGame,
  setGameTime,
  toRestartGame,
  lineEnd,
  setAccuracy,
} = GameSlice.actions;

export default GameSlice.reducer;
