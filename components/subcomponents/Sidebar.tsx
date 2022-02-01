import { BsFillKeyboardFill } from 'react-icons/bs';
import { RiSettings3Fill } from 'react-icons/ri';
import { HiInformationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { changeDisplayArea } from '../../redux/displaySlice';
import { restartGame } from '../../redux/gameSlice';

interface State {
  theme: {
    lightDark: string;
    highlight: string;
    primary: string;
  };
  display: {
    display: string;
  };
}

const Sidebar = () => {
  const {
    theme,
    display: { display },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();

  const setDisplay = (area: 'game' | 'setting' | 'info') => {
    dispatch(restartGame(''));
    dispatch(changeDisplayArea(area));
  };
  return (
    <aside
      style={{ background: `${theme.highlight}` }}
      className="fixed z-10 bottom-0 right-0 sm:w-20 sm:h-[15rem] rounded-tl-xl rounded-tr-xl sm:rounded-tr-none w-screen h-[4rem]"
    >
      <ul className="h-full w-full flex sm:flex-col justify-around items-center">
        <li onClick={() => setDisplay('game')}>
          <BsFillKeyboardFill
            className={`text-2xl ${display === 'game' ? '' : 'hovering'}`}
            style={{
              color: display === 'game' ? 'white' : theme.primary,
            }}
          />
        </li>
        <li onClick={() => setDisplay('setting')}>
          <RiSettings3Fill
            className={`text-2xl ${display === 'setting' ? '' : 'hovering'}`}
            style={{
              color: display === 'setting' ? 'white' : theme.primary,
            }}
          />
        </li>
        <li onClick={() => setDisplay('info')}>
          <HiInformationCircle
            className={`text-2xl ${display === 'info' ? '' : 'hovering'}`}
            style={{
              color: display === 'info' ? 'white' : theme.primary,
            }}
          />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
