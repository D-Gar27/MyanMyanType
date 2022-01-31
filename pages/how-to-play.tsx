import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Navbar from '../components/subcomponents/Navbar';

const HowToPlay = () => {
  return (
    <>
      <Head>
        <title>How to play MyanMyanType</title>
      </Head>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-8rem)] flex flex-col ">
        <figure className="relative w-full h-[25rem]">
          <Image
            src={'/images/howToPlay.png'}
            alt="how-to-play"
            layout="fill"
            objectFit="contain"
          />
        </figure>
      </main>
    </>
  );
};

export default HowToPlay;
