import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/subcomponents/Navbar';
import Sidebar from '../components/subcomponents/Sidebar';

interface State {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
  setting: {
    webLang: 'eng' | 'myan';
  };
}

const NotFound = () => {
  const { theme, setting } = useSelector((state: State) => state);

  return (
    <>
      <Head>
        <title>404 - Page not exist</title>
      </Head>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <h1 style={{ color: theme.primary }} className="text-6xl">
            404
          </h1>
          <h3 style={{ color: theme.highlight }} className="text-2xl">
            Page not found
          </h3>
        </div>
        <Link href={'/'} passHref>
          <button className="text-white px-4 py-1 border-2 rounded-md mt-6 duration-200 ease-out transition-all hover:bg-white hover:bg-opacity-20">
            back to game
          </button>
        </Link>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default NotFound;
