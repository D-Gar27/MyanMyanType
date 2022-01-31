import { useSelector } from 'react-redux';
import { HiInformationCircle } from 'react-icons/hi';
import Link from 'next/link';

interface ThemeState {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
  setting: {};
}

const Info = () => {
  const { theme, setting } = useSelector((state: ThemeState) => state);

  return (
    <section className="mt-14 pb-20">
      <article className="flex flex-col gap-8 items-start justify-center">
        <div>
          <h3
            className="text-[1.5rem] flex items-center gap-2"
            style={{ color: `${theme.highlight}` }}
          >
            <span className="text-[1.75rem]">
              <HiInformationCircle />
            </span>
            About MyanMyanType
          </h3>
          <p style={{ color: `${theme.primary}` }}>
            MyanMyanType is a simple typing test for Burmese language, inluding
            various test modes and lots of themes. If you want to practise your
            Burmese typing skills, MyanMyanType is your best friend.
          </p>
        </div>
        <div>
          <h4
            className="text-[1.1rem] flex items-center gap-2"
            style={{ color: `${theme.highlight}e6` }}
          >
            word set
          </h4>
          <p style={{ color: `${theme.primary}` }}>
            MyanMyanType uses the most common and easiest 250 words in the
            Burmese language to create tests by default. You can change your
            preferences in setting.
          </p>
        </div>
        <div>
          <h4
            className="text-[1.1rem] flex items-center gap-2"
            style={{ color: `${theme.highlight}e6` }}
          >
            stats
          </h4>
          <ul style={{ color: `${theme.primary}` }}>
            <li>
              WPM - caculated amount of words that user correctly can type
              within a minute
            </li>
            <li>accuracy - percentage of correctly typed words</li>
            <li>correct - total amount of words that user correctly typed</li>
            <li>
              incorrect - total amount of words that user incorrectly typed
            </li>
          </ul>
        </div>
      </article>
      <ul
        className="w-full flex flex-wrap mt-5 gap-4"
        style={{ color: theme.highlight }}
      >
        <li>
          <a
            href=""
            className="flex hover:brightness-150 duration-200 ease-out transition-all"
          >
            bug report
          </a>
        </li>
        <li>
          <a
            href=""
            className="hover:brightness-150 duration-200 ease-out transition-all"
          >
            feedback
          </a>
        </li>
        <li>
          <Link href="/how-to-play" passHref>
            <a className="flex hover:brightness-150 duration-200 ease-out transition-all">
              how to play
            </a>
          </Link>
        </li>
        <li>
          <a
            href=""
            className="hover:brightness-150 duration-200 ease-out transition-all"
          >
            keyboards
          </a>
        </li>
      </ul>
      <p style={{ color: `${theme.highlight}` }} className="mt-6">
        Built with love by{' '}
        <a
          href="https://htetwinkhant.vercel.app"
          target={'_blank'}
          rel="noreferrer"
          className="border-b-[1px] border-current"
          style={{ color: `${theme.primary}` }}
        >
          Htet Win Khant
        </a>
      </p>
    </section>
  );
};

export default Info;
