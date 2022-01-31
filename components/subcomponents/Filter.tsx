import { useSelector } from 'react-redux';
import Select from './AccuracySelect';
import TimeSelect from './TimeSelect';

interface ThemeState {
  theme: {
    lightDark: string;
    primary: string;
    highlight: string;
  };
}

const TimeOptions = [30, 60, 90, 120];
const AddOptions = [85, 90, 95];

const Filter = () => {
  const theme = useSelector((state: ThemeState) => state.theme);

  return (
    <section
      className="w-full flex lg:items-start justify-center flex-col items-center lg:justify-around sm:flex-row lg:gap-0 gap-6 mt-12"
      style={{ color: `${theme.highlight}` }}
    >
      <div className="flex items-center lg:justify-center justify-between gap-2 flex-1 w-full max-w-[20rem]">
        <label htmlFor="time" className="text-lg font-semibold">
          Seconds
        </label>
        <TimeSelect options={TimeOptions} />
      </div>
      <div className="flex items-center lg:justify-center justify-between gap-2 flex-1 w-full max-w-[20rem]">
        <label htmlFor="add" className="text-lg font-semibold">
          Accuracy
        </label>
        <Select options={AddOptions} />
      </div>
    </section>
  );
};

export default Filter;
