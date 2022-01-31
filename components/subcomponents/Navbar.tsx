import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FaCrown } from 'react-icons/fa';
import ThemeButton from './ThemeButton';
import { changeDisplayArea } from '../../redux/displaySlice';

interface ThemeState {
  theme: {
    primary: string;
  };
}

const Navbar = () => {
  const theme = useSelector((state: ThemeState) => state.theme);
  const diepatch = useDispatch();
  return (
    <>
      <header className="w-full">
        <nav className="w-full h-16 flex justify-between items-center">
          <Link href={'/'}>
            <a
              className="sm:text-2xl text-xl"
              style={{ color: `${theme.primary}` }}
            >
              MyanMyanType
            </a>
          </Link>
          <ul
            className="flex md:gap-10 gap-6 items-center"
            style={{ color: `${theme.primary}` }}
          >
            <li className="hovering">
              <ThemeButton />
            </li>
            <li
              className="hovering"
              onClick={() => diepatch(changeDisplayArea('leaderboard'))}
            >
              <FaCrown className="text-xl" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
