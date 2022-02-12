import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setLeaderBoard } from '../redux/userSlice';

interface Children {
  children: JSX.Element;
}

interface ThemeState {
  theme: {
    dark: string;
    primary: string;
    highlight: string;
    light: string;
  };
}

type Top =
  | {
      wpm?: number;
      username?: string;
      userImg?: string;
      id?: string;
    }[];

const Layout = ({ children }: Children) => {
  const theme = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const getLeaderBoard = async () => {
      const ref = query(
        collection(db, 'WPM'),
        orderBy('wpm', 'desc'),
        limit(10)
      );
      getDocs(ref).then((snap) => {
        const topPlayers: Top = [];
        snap.docs.forEach((doc) =>
          topPlayers.push({ ...doc.data(), id: doc.id })
        );
        dispatch(setLeaderBoard({ leaderboard: topPlayers }));
      });
    };
    getLeaderBoard();
  }, []);
  return (
    <>
      <div
        style={{ backgroundColor: theme?.dark }}
        className="w-screen min-h-screen"
      >
        <div className="w-full lg:max-w-[1224px] mx-auto px-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
