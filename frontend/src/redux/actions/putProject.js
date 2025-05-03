export const putProject =
  (projectId, projectName, projectDescription) => async (dispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUT_PROJECT}/project/${projectId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projectName,
            content: projectDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const editedProject = await response.json();
      dispatch({ type: 'EDIT_PROJECT', payload: editedProject });
      return editedProject;
    } catch (error) {
      console.error('Error editing project', error);
      throw error;
    }
  };
