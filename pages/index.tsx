import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Info from '../components/Info';
import Leaderboard from '../components/Leaderboard';
import Setting from '../components/Setting';
import Filter from '../components/subcomponents/Filter';
import Footer from '../components/subcomponents/Footer';
import Navbar from '../components/subcomponents/Navbar';
import Sidebar from '../components/subcomponents/Sidebar';
import TypeArea from '../components/TypeArea';
import { changeSetting } from '../redux/settingSlice';
import { restoreLastTheme } from '../redux/themeSlice';
import { Themes } from '../Theme';

interface State {
  display: {
    display: string;
  };
  setting: {};
}

const Home: NextPage = () => {
  const {
    display: { display },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const settingValue = localStorage.getItem('MyanMyanTypeSetting');
    if (settingValue) {
      dispatch(changeSetting(JSON.parse(settingValue)));
    }
  }, [dispatch]);

  useEffect(() => {
    const themeName = localStorage.getItem('lath');
    if (themeName) {
      const theme = Themes.find((theme) => theme.name === themeName);
      dispatch(restoreLastTheme(theme?.colours));
    }
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>MyanMyanType - Burmese Typing Speed Test</title>
      </Head>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[calc(100vh-8rem)] flex flex-col ">
        {display === 'game' && (
          <>
            {' '}
            <TypeArea />
            <Filter />
          </>
        )}
        {display === 'setting' && <Setting />}
        {display === 'info' && <Info />}
        {display === 'leaderboard' && <Leaderboard />}
      </main>
      <Footer />
    </>
  );
};

export default Home;
