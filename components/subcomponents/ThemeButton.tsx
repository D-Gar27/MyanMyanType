import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/themeSlice';
import { Themes } from '../../Theme';

interface ThemeState {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
}

const ThemeButton = () => {
  const [selected, setSelected] = useState<string>('Default');
  const theme = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const themeName = localStorage.getItem('lath');
    if (themeName) {
      setSelected(themeName);
    }
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex gap-2 items-center relative">
          Theme
          <span>
            <FaChevronDown className="text-sm" aria-hidden="true" />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-10 right-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{ backgroundColor: `${theme.lightDark}` }}
        >
          <div className="px-1 py-1 ">
            {Themes.map((the) => (
              <Menu.Item key={the.name}>
                <button
                  className={`group flex rounded-md justify-between items-center w-full px-2 py-2 text-sm hover:bg-gray-200 hover:bg-opacity-20 ${
                    selected === the.name ? 'bg-gray-200 bg-opacity-20' : ''
                  }`}
                  style={{
                    color: `${theme.primary}`,
                  }}
                  onClick={() => {
                    dispatch(changeTheme(the.colours));
                    setSelected(the.name);
                    localStorage.setItem('lath', the.name);
                  }}
                >
                  {the.name}
                  <span>{selected === the.name && <BsCheck2All />}</span>
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeButton;
