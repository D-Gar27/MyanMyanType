import { useSelector } from 'react-redux';

interface ThemeState {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
}

const Leaderboard = () => {
  const theme = useSelector((state: ThemeState) => state.theme);
  return (
    <section
      className="mt-20 w-full rounded-md py-8 h-[calc(100vh-15rem)]"
      style={{ backgroundColor: theme.lightDark }}
    >
      <h3 style={{ color: theme.primary }} className="text-2xl text-center">
        Leaderboard
      </h3>
      <p
        style={{ color: theme.highlight }}
        className="mt-40 text-xl text-center"
      >
        Coming soon...
      </p>
    </section>
  );
};

export default Leaderboard;
