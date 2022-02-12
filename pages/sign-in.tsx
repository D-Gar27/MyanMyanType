import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

interface Props {
  providers: {
    google: {
      id: string;
    };
  };
}
interface State {
  theme: {
    dark: string;
    primary: string;
  };
}

const SignIn = ({ providers }: Props) => {
  const { theme } = useSelector((state: State) => state);
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main
        className="w-full h-screen flex flex-col justify-center items-center gap-6"
        style={{ backgroundColor: theme.dark }}
      >
        <button
          className="text-xl flex items-center gap-4 border-2 rounded-sm border-current py-2 px-8"
          style={{ color: theme.primary }}
          onClick={() => signIn(providers.google.id, { redirect: true })}
        >
          Sign in with <FcGoogle />
        </button>
        <Link href={'/'} passHref>
          <button className="text-base text-white underline">
            back to home
          </button>
        </Link>
      </main>
    </>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
