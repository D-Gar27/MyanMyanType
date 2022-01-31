import { useDispatch, useSelector } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import React, { useEffect, useRef, useState } from 'react';
import Timer from './subcomponents/Timer';
import {
  finishGame,
  lineEnd,
  restartGame,
  startTheGame,
  toRestartGame,
} from '../redux/gameSlice';
import { normal, master, numbers } from '../words/burmese';
import { BsCheck } from 'react-icons/bs';

interface WordProps {
  active: boolean;
  word: string;
  correct: boolean;
  isCorrect: boolean;
}

const Word = ({ active, word, correct, isCorrect }: WordProps) => {
  const { theme } = useSelector((state: State) => state);
  const activeWord = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeWord) {
      const offsetTop = activeWord.current?.offsetTop;
      const offsetLeft = activeWord.current?.offsetLeft;
      if (offsetTop > 74 && offsetLeft === 0) {
        dispatch(lineEnd(''));
      }
    }
  }, [active, dispatch]);

  if (correct) {
    return (
      <span
        style={{
          color: `${theme.correct}`,
        }}
      >
        {word}{' '}
      </span>
    );
  }
  if (correct === false) {
    return (
      <span
        style={{
          color: `${theme.incorrect}`,
        }}
      >
        {word}{' '}
      </span>
    );
  }
  if (active) {
    return (
      <span
        ref={activeWord}
        className={'rounded-[5px] pb-1 pl-1 font-medium'}
        style={{
          backgroundColor: `${theme.highlight}66`,
          color: isCorrect ? theme.primary : theme.incorrect,
        }}
      >
        {word}{' '}
      </span>
    );
  }
  return <span>{word} </span>;
};

interface State {
  theme: {
    lightDark: string;
    primary: string;
    highlight: string;
    incorrect: string;
    correct: string;
  };
  game: {
    started: boolean;
    finished: boolean;
    endOfText: number;
    time: number;
    restart: boolean;
    accuracy: number | 'None';
  };
  setting: {
    level: 'normal' | 'master';
    number: boolean;
  };
}

const WordCom = React.memo(Word);

const TypeArea = () => {
  const { theme, game, setting } = useSelector((state: State) => state);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<any[]>([]);
  const [isCurrentWordCorrect, setIsCurrentWordCorrect] =
    useState<boolean>(true);
  const [textData, setTextData] = useState<string[]>();
  const [result, setResult] = useState<{
    total: number;
    WPM: number;
    correct: number;
    incorrect: number;
    accuracy: number | any;
  } | null>(null);

  const setTextToTextData = () => {
    if (setting.level === 'normal' && !setting.number) {
      return normal();
    }
    if (setting.level === 'normal' && setting.number) {
      const numIncluded = [...numbers(), ...normal().slice(0, 201)];
      return numIncluded.sort(() => (Math.random() > 0.5 ? 1 : -1));
    }
    if (setting.level === 'master') {
      return master();
    }
  };

  useEffect(() => {
    setLoading(false);
    setTextData(setTextToTextData());
  }, [setting.level]);

  useEffect(() => {
    if (game.restart === true) {
      setTextData(setTextToTextData());
      setCurrentWordIndex(0);
      setCorrectWords([]);
      setUserInput('');
    }
  }, [game.restart]);

  const dispatch = useDispatch();

  const restartTheGame = () => {
    dispatch(restartGame(''));
  };

  const checkWord = (e: any) => {
    if (textData) {
      setUserInput(e.target.value);
      if (!game.started) {
        dispatch(startTheGame(''));
        dispatch(toRestartGame(''));
      }
      if (e.target.value.endsWith(' ')) {
        setCurrentWordIndex((prev) => prev + 1);
        setUserInput('');

        setCorrectWords((prev: any) => {
          const word = e.target.value.trim();
          const res = [...prev];
          res[currentWordIndex] = word === textData[currentWordIndex];
          return res;
        });
      }
    }
  };

  useEffect(() => {
    if (textData) {
      const length = textData[currentWordIndex].length;
      const regex = new RegExp(
        `^[${textData[currentWordIndex]}]{0,${length}}$`
      );
      setIsCurrentWordCorrect(regex.test(userInput));
    }
  }, [userInput, currentWordIndex, textData]);

  useEffect(() => {
    if (game.started && !game.finished) {
      const total = correctWords.length;
      const WPM = Math.floor(correctWords.length / (game.time / 60));
      const correct = correctWords.filter((words) => words === true).length;
      const incorrect = correctWords.filter((words) => words === false).length;
      const accuracy = Math.floor(((total - incorrect) / total) * 100);
      setResult({ total, WPM, correct, incorrect, accuracy });
      if (
        setting.level === 'normal' &&
        game.accuracy !== 'None' &&
        total > 5 &&
        accuracy < game.accuracy
      ) {
        dispatch(finishGame(''));
      }
      if (setting.level === 'master' && total > 5 && accuracy < 95) {
        dispatch(finishGame(''));
      }
    }
  }, [game, correctWords, dispatch, setting.level]);

  return (
    <section className="w-full relative sm:mt-20 mt-12">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full h-[17rem] flex flex-col items-center justify-center gap-8">
          <div
            style={{
              color: `${theme.primary}`,
              backgroundColor: `${theme.lightDark}`,
            }}
            className="w-full overflow-hidden h-[17rem] bg-transparent border-none pointer-events-none p-4 rounded-md shadow-xl"
          >
            {!game.finished && (
              <p
                className="w-full text-2xl leading-[3.7rem] selection:bg-none pointer-events-none -mt-[6px]"
                style={{
                  transform: `translate(0, ${-3.7 * 16 * game.endOfText}px)`,
                }}
              >
                {textData?.map((word, index) => (
                  <WordCom
                    key={word}
                    word={word}
                    active={index === currentWordIndex}
                    correct={correctWords[index]}
                    isCorrect={isCurrentWordCorrect}
                  />
                ))}
              </p>
            )}
            {game.finished && (
              <div className="w-full h-full flex items-center justify-around flex-col md:flex-row">
                <p className="md:text-[3rem] text-3xl flex-1 flex items-center justify-center gap-4">
                  {result?.WPM} WPM
                </p>
                <p
                  className="flex-1 flex items-center md:justify-center md:gap-4 justify-between w-full mx-auto max-w-[10rem] md:max-w-none brightness-125"
                  style={{ color: theme.highlight }}
                >
                  Accuracy{' '}
                  <span className="" style={{ color: theme.primary }}>
                    {result?.accuracy}%
                  </span>
                </p>
                <p
                  className="flex-1 flex items-center md:justify-center md:gap-4 justify-between w-full mx-auto max-w-[10rem] md:max-w-none brightness-125"
                  style={{ color: theme.highlight }}
                >
                  Correct{' '}
                  <span
                    className="flex items-center gap-1"
                    style={{ color: theme.correct }}
                  >
                    {result?.correct} <BsCheck />
                  </span>
                </p>
                <p
                  className="flex-1 flex items-center md:justify-center md:gap-4 justify-between w-full mx-auto max-w-[10rem] md:max-w-none brightness-125"
                  style={{ color: theme.highlight }}
                >
                  Incorrect{' '}
                  <span
                    className="flex items-center gap-1"
                    style={{ color: theme.incorrect }}
                  >
                    {result?.incorrect} <RiCloseFill />
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-between lg:gap-8 gap-2">
            <Timer />
            <input
              type="text"
              value={userInput}
              lang="my"
              disabled={game.finished}
              onChange={checkWord}
              className="h-10 w-full ring-0 outline-none rounded-md pl-2 disabled:bg-gray-200 placeholder:text-gray-600"
              style={{ border: `${theme.primary} solid 1px` }}
              placeholder="Type to start"
            />
            <button
              style={{ backgroundColor: `${theme.highlight}` }}
              onClick={restartTheGame}
              className="h-10 w-20 flex items-center justify-center font-lg font-semibold tracking-wider text-white rounded-md group hover:brightness-110 ease-out duration-200"
            >
              <FaRedo className="restart-icon" />
              <div
                className="group-hover:flex hidden absolute top-[150%] rounded-md px-4 py-2"
                style={{ backgroundColor: theme.lightDark }}
              >
                <p
                  className="w-max font-normal"
                  style={{ color: theme.primary }}
                >
                  {game.restart ? 'not available' : 'restart the test'}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TypeArea;
