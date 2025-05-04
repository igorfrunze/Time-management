import { useDispatch } from 'react-redux';
import { startTimer, stopTimer } from '../../redux';
import { Button } from '../button/Button';

import styles from './timerControl.module.css';

export const TimerControls = ({ projectId }) => {
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(startTimer(projectId));
  };

  const handleStop = () => {
    dispatch(stopTimer(projectId));
  };

  return (
    <div>
      <Button onClick={handleStart}>Start Timer</Button>
      <Button onClick={handleStop}>Stop Timer</Button>
    </div>
  );
};
