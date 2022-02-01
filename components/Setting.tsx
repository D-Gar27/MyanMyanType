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
              {setting.webLang === 'eng' ? 'Level' : 'အဆင့်'}
            </label>
            <p className="text-white">
              {setting.webLang === 'eng'
                ? ` normal is default-test level (easy words). the master level
              includes hard words, numbers and it fails if your accuracy below
              95% after 5 words typed (200 words)`
                : 'ပုံမှန် default-test အဆင့်တွင် (အလွယ်စကားလုံးများ) ပါ၀င်ပါတယ်။ မာစတာအဆင့်တွင် ခက်ခဲသောစကားလုံးများ၊ နံပါတ်များ အပြင် စာလုံး 5 လုံးရိုက်ပြီးနောက် သင်၏တိကျမှု 95% အောက်တွင်ရှိနေပါက ရှုံးပါသည်။'}
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
              {setting.webLang === 'eng' ? 'master' : 'မာစတာ'}
            </button>
          </div>
        </div>
        <div className="flex sm:gap-4 flex-col sm:flex-row mt-6 justify-between items-center">
          <div>
            <label htmlFor="level" className="setting-label">
              {setting.webLang === 'eng'
                ? 'Website Language'
                : 'ဝဘ်ဆိုဒ်ဘာသာစကား'}
            </label>
            <p className="text-white">
              {setting.webLang === 'eng'
                ? "default language that MyanMyanType uses is English. You can change to Burmese if you want to but it's not available for all pages"
                : 'MyanMyanType အသုံးပြုသည့် မူရင်းဘာသာစကားမှာ အင်္ဂလိပ်ဖြစ်သည်။ လိုချင်ပါက မြန်မာဘာသာသို့ ပြောင်းနိုင်သော်လည်း စာမျက်နှာအားလုံးအတွက် မရနိုင်ပါ'}
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
              {setting.webLang === 'eng' ? 'Add Numbers' : 'နံပါတ်များထည့်ပါ'}
            </label>
            <p className="text-white">
              {setting.webLang === 'eng'
                ? ' enable to add numbers to your test (master level already indcluded numbers)'
                : 'စမ်းသပ်မှုတွင် နံပါတ်များထည့်ရန် ဖွင့်ပါ (မာစတာအဆင့်တွင် နံပါတ်များပါပြီးသား ဖြစ်ပါတယ်)'}
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
              {setting.webLang === 'eng' ? 'disable' : 'ပိတ်ပါ'}
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
              {setting.webLang === 'eng' ? 'enable' : 'ဖွင့်ပါ'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Setting;
