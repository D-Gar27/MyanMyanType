import { useSelector } from 'react-redux';

interface Children {
  children: JSX.Element;
}

interface ThemeState {
  theme: {
    dark: string;
    primary: string;
    highlight: string;
    light: string;
  };
}

const Layout = ({ children }: Children) => {
  const theme = useSelector((state: ThemeState) => state.theme);

  return (
    <>
      <div
        style={{ backgroundColor: theme?.dark }}
        className="w-screen min-h-screen"
      >
        <div className="w-full lg:max-w-[1224px] mx-auto px-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
