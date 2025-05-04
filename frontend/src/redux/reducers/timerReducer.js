const initialState = {
  timers: {},
  loading: false,
};

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        timers: {
          ...state.timers,
          [action.payload.projectId]: {
            ...state.timers[action.payload.projectId],
            isRunning: true,
            startedAt: action.payload.startedAt,
          },
        },
      };
    case 'STOP_TIMER':
      return {
        ...state,
        timers: {
          ...state.timers,
          [action.payload.projectId]: {
            isRunning: false,
            timeSpent: action.payload.timeSpent,
          },
        },
      };
    case 'SET_TIMERS':
      return {
        ...state,
        timers: action.payload,
      };
    default:
      return state;
  }
};
