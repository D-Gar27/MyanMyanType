import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSetting } from '../redux/settingSlice';

interface ThemeState {
  theme: {
    primary: string;
    highlight: string;
    lightDark: string;
  };
  setting: {
    level: string;
    webLang: string;
    number: boolean;
  };
}
const Setting = () => {
  const { theme, setting: set } = useSelector((state: ThemeState) => state);
  const [setting, setSetting] = useState({
    level: 'normal',
    webLang: 'eng',
    number: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const settingValue = localStorage.getItem('MyanMyanTypeSetting');
    if (settingValue) {
      setSetting(JSON.parse(settingValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('MyanMyanTypeSetting', JSON.stringify(setting));
    dispatch(changeSetting(setting));
  }, [setting, dispatch]);

  return (
    <>
      <Head>
        <title>Setting - MyanMyanType</title>
      </Head>
      <section
        className="w-full relative sm:mt-4 mt-12 flex flex-col gap-8 pb-20"
        style={{ color: theme.primary }}
      >
        <div className="flex sm:gap-4 flex-col sm:flex-row mt-6 justify-between items-center">
          <div>
            <label htmlFor="level" className="setting-label">
              Level
            </label>
            <p className="text-white">
              normal is default test level (easy words). master level includes
              hard words, numbers and fails if your accuracy if below 95% after
              5 words typed but only total of 200 words
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 sm:mt-0">
            <button
              onClick={() => setSetting({ ...setting, level: 'normal' })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  setting.level === 'normal' ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              {setting.webLang === 'eng' ? 'normal' : 'ပုံမှန်'}
            </button>
            <button
              onClick={() => setSetting({ ...setting, level: 'master' })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  setting.level === 'master' ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              {setting.webLang === 'eng' ? 'master' : 'ဆရာ'}
            </button>
          </div>
        </div>
        <div className="flex sm:gap-4 flex-col sm:flex-row mt-6 justify-between items-center">
          <div>
            <label htmlFor="level" className="setting-label">
              Website Language
            </label>
            <p className="text-white">
              default language that MyanMyanType uses is English. You can change
              to Burmese if you want to but is&apos;s not available for all
              pages.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 sm:mt-0">
            <button
              onClick={() => setSetting({ ...setting, webLang: 'eng' })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  setting.webLang === 'eng' ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              {setting.webLang === 'eng' ? 'eng' : 'အင်္ဂလိပ်'}
            </button>
            <button
              onClick={() => setSetting({ ...setting, webLang: 'myan' })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  setting.webLang === 'myan' ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              {setting.webLang === 'eng' ? 'myan' : 'မြန်မာ'}
            </button>
          </div>
        </div>
        <div className="flex sm:gap-4 flex-col sm:flex-row mt-6 justify-between items-center">
          <div>
            <label htmlFor="level" className="setting-label">
              Add Numbers
            </label>
            <p className="text-white">
              enable to add numbers to your test (master level already indluded
              numbers)
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 sm:mt-0">
            <button
              onClick={() => setSetting({ ...setting, number: false })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  !setting.number ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              disable
            </button>
            <button
              onClick={() => setSetting({ ...setting, number: true })}
              className="setting-btn"
              style={{
                backgroundColor: `${
                  setting.number ? theme.highlight : theme.lightDark
                }`,
              }}
            >
              enable
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Setting;
