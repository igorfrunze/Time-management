const initialState = {
  token: localStorage.getItem('token') || null,
  id: localStorage.getItem('id') || null,
  email: localStorage.getItem('email') || null,
  name: null,
  imageURL: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        id: null,
        email: null,
        name: null,
        imageURL: null,
      };
    }

    case 'REGISTER': {
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
      };
    }

    case 'EDIT_USER': {
      return {
        ...state,
        name: action.payload.name,
        imageURL: action.payload.imageURL,
      };
    }

    default:
      return state;
  }
};
