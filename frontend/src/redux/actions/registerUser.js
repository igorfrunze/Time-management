export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(import.meta.env.VITE_REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('id', data.id);
      dispatch({
        type: 'REGISTER',
        payload: { token: data.token, email: data.email, id: data.id },
      });
    } else {
      throw new Error(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
