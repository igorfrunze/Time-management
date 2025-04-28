export const postProject = (userId, name, content) => async (dispatch) => {
  try {
    const response = await fetch(import.meta.env.VITE_ADD_PROJECT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        name,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const newProject = await response.json();
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    return newProject;
  } catch (error) {
    console.error('Error creating post', error);
    throw error;
  }
};
