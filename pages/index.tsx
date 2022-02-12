import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
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
import { restoreUser } from '../redux/userSlice';
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
  const { data: session } = useSession();

  useEffect(() => {
    const settingValue = localStorage.getItem('MyanMyanTypeSetting');
    const themeName = localStorage.getItem('lath');
    if (settingValue) {
      dispatch(changeSetting(JSON.parse(settingValue)));
    }
    if (themeName) {
      const theme = Themes.find((theme) => theme.name === themeName);
      dispatch(restoreLastTheme(theme?.colours));
    }
    if (session) {
      dispatch(
        restoreUser({
          username: session.user?.name,
          userImg: session.user?.image,
        })
      );
      return;
    }
    const username = localStorage.getItem('MyanMyanTypeUsername');
    if (!session && username) {
      dispatch(restoreUser({ username, userImg: '' }));
      return;
    }
    if (!username) {
      (function () {
        const guest = 'Guest_' + (Math.random() + 1).toString(36).substring(5);
        localStorage.setItem('MyanMyanTypeUsername', guest);
        dispatch(restoreUser({ username: guest, userImg: '' }));
      })();
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>MyanMyanType - Burmese Typing Speed Test</title>
        <meta
          name="description"
          content="With MyanMyanType you can practise your burmese typing speed to the next level"
        />
        <meta
          name="keywords"
          content="myanmyantype, burmese typing,burmese typing test,burmese typing speed test,myanmar typing test, myanmar typing speed, myanmar typing app, myanmar typing, myan myan type "
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myanmyantype.vercel.app" />
        <meta
          property="og:title"
          content="MyanMyanType - Burmese Typing Speed Test"
        />
        <meta
          name="google-site-verification"
          content="ULdBtB-p9nC0fR-b5ohw1KhLkdAsCkqUFgOaNxpWm3A"
        />
        <meta property="og:image" content="/images/ogImg.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
