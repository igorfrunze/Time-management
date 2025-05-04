export const startTimer = (projectId) => async (dispatch) => {
  const userId = localStorage.getItem('id');

  try {
    const response = await fetch(`${import.meta.env.VITE_TIMERS}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, projectId }),
    });
    const data = await response.json();
    dispatch({ type: 'START_TIMER', payload: data });
  } catch (error) {
    console.error('Error starting timer:', error);
  }
};

export const stopTimer = (projectId) => async (dispatch) => {
  const userId = localStorage.getItem('id');
  try {
    const response = await fetch(`${import.meta.env.VITE_TIMERS}/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, projectId }),
    });
    const data = await response.json();
    dispatch({ type: 'STOP_TIMER', payload: data });
  } catch (error) {
    console.error('Error stopping timer:', error);
  }
};

export const fetchTimers = () => async (dispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_TIMERS}`);
    const data = await response.json();
    dispatch({ type: 'SET_TIMERS', payload: data });
  } catch (error) {
    console.error('Error fetching timers:', error);
  }
};
