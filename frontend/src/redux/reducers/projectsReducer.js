const initialState = {
  projects: [],
  page: 1,
  totalPages: 1,
  singleProject: null,
  loading: false,
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT': {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    }

    case 'SET_PROJECTS_LOADING': {
      return { ...state, loading: true };
    }

    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: action.payload.projects,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    }

    case 'SET_SINGLE_PROJECT': {
      return {
        ...state,
        singleProject: action.payload,
      };
    }

    case 'EDIT_PROJECT': {
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    }

    case 'DELETE_PROJECT': {
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
};
