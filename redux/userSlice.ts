import { createSlice } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const addWpm = async (username: string, WPM: number, userImg = '') => {
  const ref = collection(db, 'WPM');
  await addDoc(ref, {
    username: username,
    wpm: WPM,
    userImg,
  });
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    userImg: '',
    result: {
      WPM: 0,
      accuracy: 0,
      correct: 0,
      incorrect: 0,
      total: 0,
    },
    leaderboard: [{ username: '', wpm: 0, userImg: '' }],
  },
  reducers: {
    restoreUser: (state, action) => {
      state.username = action.payload.username;
      state.userImg = action.payload.userImg;
    },
    setLeaderBoard: (state, action) => {
      state.leaderboard = action.payload.leaderboard;
    },
    addToLeaderBoard: (state, action) => {
      state.result = action.payload.result;
      const smaller = state.leaderboard?.filter(
        (user) => user?.wpm < action.payload.wpm
      );
      if (smaller.length) {
        addWpm(
          action.payload.username,
          action.payload.wpm,
          action.payload.userImg
        );
      }
    },
  },
});

export const { restoreUser, setLeaderBoard, addToLeaderBoard } =
  UserSlice.actions;
export default UserSlice.reducer;
