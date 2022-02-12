import { useSelector } from 'react-redux';
import { HiInformationCircle } from 'react-icons/hi';
import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

interface State {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
  setting: {
    webLang: 'eng' | 'myan';
  };
}

const Info = () => {
  const { theme, setting } = useSelector((state: State) => state);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>About - MyanMyanType</title>
      </Head>

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
              {setting.webLang === 'eng'
                ? 'About MyanMyanType'
                : 'MyanMyanType အကြောင်း'}
            </h3>
            <p style={{ color: `${theme.primary}` }}>
              {setting.webLang === 'eng'
                ? 'MyanMyanType is a simple typing test for the Burmese language, including various test modes and lots of themes. If you want to practise your Burmese typing skills, MyanMyanType is your best friend.'
                : 'MyanMyanType သည် အမျိုးမျိုးသော စမ်းသပ်မုဒ်များနှင့် အပြင်အဆင်များစွာ အပါအဝင် မြန်မာဘာသာစကားအတွက် ရိုးရှင်းသော စာရိုက်စမ်းသပ်မှုတစ်ခုဖြစ်သည်။ မြန်မာစာရိုက်စွမ်းရည်ကို လေ့ကျင့်ချင်ရင် MyanMyanType က မင်းရဲ့အကောင်းဆုံးသူငယ်ချင်းပါ။'}
            </p>
          </div>
          <div>
            <h4
              className="text-[1.1rem] flex items-center gap-2"
              style={{ color: `${theme.highlight}e6` }}
            >
              {setting.webLang === 'eng' ? 'word set' : 'စကားလုံးများ'}
            </h4>
            <p style={{ color: `${theme.primary}` }}>
              {setting.webLang === 'eng'
                ? 'MyanMyanType uses the most common and easiest 250 words in the Burmese language to create tests by default. You can change your preferences in the setting.'
                : 'MyanMyanType သည် ပုံမှန်အားဖြင့် စမ်းသပ်ခြင်းများဖန်တီးရန် မြန်မာဘာသာစကားတွင် အသုံးအများဆုံးနှင့် အလွယ်ကူဆုံး စကားလုံး 250 ကို အသုံးပြုပါသည်။ ဆက်တင်တွင် သင့်စိတ်ကြိုက်များကို ပြောင်းလဲနိုင်သည်။'}
            </p>
          </div>
          <div>
            <h4
              className="text-[1.1rem] flex items-center gap-2"
              style={{ color: `${theme.highlight}e6` }}
            >
              {setting.webLang === 'eng' ? 'stats' : 'ကိန်းဂဏန်းများ'}
            </h4>
            <ul style={{ color: `${theme.primary}` }}>
              <li>
                WPM -{' '}
                {setting.webLang === 'eng'
                  ? 'calculated amount of words that user correctly typed within a minute'
                  : 'အသုံးပြုသူ တစ်မိနစ်အတွင်း မှန်ကန်စွာရိုက်နိုင်သော စကားလုံးပမာဏကို တွက်ချက်သည်'}
              </li>
              <li>
                accuracy -{' '}
                {setting.webLang === 'eng'
                  ? 'percentage of correctly typed words'
                  : 'မှန်ကန်စွာရိုက်ထားသော စကားလုံးများ၏ ရာခိုင်နှုန်း'}
              </li>
              <li>
                correct -{' '}
                {setting.webLang === 'eng'
                  ? 'the total amount of words that user correctly typed'
                  : 'အသုံးပြုသူ မှန်ကန်စွာ ရိုက်ထည့်သော စကားလုံး စုစုပေါင်း ပမာဏ'}
              </li>
              <li>
                incorrect -{' '}
                {setting.webLang === 'eng'
                  ? 'the total amount of words that user incorrectly typed'
                  : 'အသုံးပြုသူ မှားယွင်းစွာ ရိုက်ထည့်သော စကားလုံး စုစုပေါင်း ပမာဏ'}
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
              href="mailto:htetwinkhant999@gmail.com?subject=Bug&body=There is a bug..."
              className="flex hover:brightness-150 duration-200 ease-out transition-all"
            >
              bug report
            </a>
          </li>
          <li>
            <a
              href="mailto:htetwinkhant999@gmail.com?subject=Feedback"
              className="hover:brightness-150 duration-200 ease-out transition-all"
            >
              feedback
            </a>
          </li>
          {!session && (
            <Link href={'/sign-in'} passHref>
              <button>sign in</button>
            </Link>
          )}
          {session && <button onClick={() => signOut()}>sign out</button>}
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
    </>
  );
};

export default Info;
