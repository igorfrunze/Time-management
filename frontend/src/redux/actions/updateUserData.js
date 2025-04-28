export const updateUserData =
  ({ email, name, imageURL }) =>
  async (dispatch) => {
    try {
      const response = await fetch(import.meta.env.VITE_UPDATE_USER, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, imageURL }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: 'EDIT_USER',
          payload: {
            name: data.name,
            imageURL: data.imageURL,
          },
        });

        return data.message || 'User updated';
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating user', error);
      throw error;
    }
  };
