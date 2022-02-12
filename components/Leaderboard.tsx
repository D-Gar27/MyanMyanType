import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';

interface State {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
}

type Top =
  | {
      wpm?: number;
      username?: string;
      userImg?: string;
      id?: string;
    }[];

const Leaderboard = () => {
  const { theme } = useSelector((state: State) => state);
  const [top, setTop] = useState<Top>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
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
          setTop(topPlayers);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    };
    getLeaderBoard();
  }, []);

  console.log(top);

  return (
    <section
      className="mt-20 w-full max-w-[800px] mx-auto rounded-md py-4 lg:mb-0 mb-20"
      style={{ backgroundColor: theme.lightDark }}
    >
      <h3 style={{ color: theme.primary }} className="text-2xl text-center">
        Fastest Fingers
      </h3>
      <div className=" w-full flex flex-col gap-4 justify-start items-center px-4 mt-8">
        {!loading ? (
          <>
            {top &&
              top?.map((user) => (
                <div
                  key={user.id}
                  className="w-full flex justify-between items-center"
                >
                  <div className="flex justify-center items-center gap-4">
                    <figure className="relative w-8 aspect-square rounded-full">
                      <Image
                        src={user.userImg ? user.userImg : '/images/user.png'}
                        alt={user.username}
                        layout="fill"
                        objectFit="contain"
                        className="!rounded-full"
                      />
                    </figure>
                    <p style={{ color: theme.primary }}>{user.username}</p>
                  </div>
                  <p style={{ color: theme.primary }}>{user.wpm} WPM</p>
                </div>
              ))}
          </>
        ) : (
          <p className="text-xl text-white">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
