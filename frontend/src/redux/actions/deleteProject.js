export const deleteProject = (projectId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GET_PROJECT}/project/${projectId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    dispatch({ type: 'DELETE_PROJECT', payload: projectId });
  } catch (error) {
    console.error('Failed to delete project', error);
    throw error;
  }
};
