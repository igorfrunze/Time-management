export const fetchUserData = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_USER_DATA}/${id}`);

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: 'EDIT_USER',
        payload: {
          name: data.name,
          imageURL: data.imageURL,
        },
      });
    } else {
      throw new Error(data.message || 'Error fetching user');
    }
  } catch (error) {
    console.error('Fetching user error', error);
  }
};
