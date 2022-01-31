import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishGame } from '../../redux/gameSlice';

interface State {
  theme: {
    highlight: string;
  };
  game: {
    started: boolean;
    finished: boolean;
    time: number;
    restart: boolean;
  };
}

const Timer = () => {
  const { theme, game } = useSelector((state: State) => state);
  const [countDown, setCountDown] = useState<number>(game.time);
  const dispatch = useDispatch();

  useEffect(() => {
    if (game.started && countDown > 0) {
      const interval = setInterval(
        () => setCountDown((prev) => prev - 1),
        1000
      );
      return () => clearInterval(interval);
    }
    if (countDown === 0 && game.started) {
      dispatch(finishGame(''));
    }
  }, [game, countDown, dispatch]);

  useEffect(() => {
    if (game.restart) {
      setCountDown(game.time);
    }
    if (game.finished) {
      setCountDown(0);
    }
  }, [game.restart, game.time, game.finished, game.started]);

  return (
    <time
      style={{ backgroundColor: `${theme.highlight}` }}
      className="h-10 w-20 flex items-center justify-center font-lg font-semibold tracking-wider text-white rounded-md"
    >
      {countDown}
    </time>
  );
};

export default Timer;
