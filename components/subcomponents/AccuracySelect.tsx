import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setAccuracy } from '../../redux/gameSlice';

interface Props {
  options: number[];
}

interface ThemeState {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
}

export default function Example({ options }: Props) {
  const [selected, setSelected] = useState<number | null | 'None'>('None');
  const dispatch = useDispatch();
  const theme = useSelector((state: ThemeState) => state.theme);
  return (
    <div className="w-[8rem]">
      <Listbox
        value={selected}
        onChange={(e) => {
          dispatch(setAccuracy(e));
          setSelected(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              style={{ backgroundColor: `${theme.lightDark}` }}
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <Listbox.Option
                style={{ color: `${theme.primary}` }}
                className={`cursor-default select-none relative py-2 pl-4 pr-4 flex items-center justify-between hover:bg-gray-200 hover:bg-opacity-20`}
                value={'None'}
              >
                <span
                  className={`${
                    selected ? 'font-medium' : 'font-normal'
                  } block truncate`}
                >
                  None
                </span>
              </Listbox.Option>
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-4 pr-4 flex items-center justify-between hover:bg-gray-200 hover:bg-opacity-20 `
                  }
                  value={option}
                  style={{ color: `${theme.primary}` }}
                >
                  <span
                    className={`${
                      selected ? 'font-medium' : 'font-normal'
                    } block truncate`}
                  >
                    {option}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
