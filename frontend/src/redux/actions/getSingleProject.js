export const getSingleProject = (projectId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GET_PROJECT}/project/${projectId}`
    );
    const data = await response.json();
    dispatch({ type: 'SET_SINGLE_PROJECT', payload: data });
  } catch (error) {
    console.error('Failed to fetch single project', error);
    throw error;
  }
};
