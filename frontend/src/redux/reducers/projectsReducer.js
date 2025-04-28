const initialState = {
  projects: [],
  page: 1,
  totalPages: 1,
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT': {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    }

    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: action.payload.projects,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    }

    default:
      return state;
  }
};
