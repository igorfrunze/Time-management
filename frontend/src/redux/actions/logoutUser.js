export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  // localStorage.removeItem('email');
  // localStorage.removeItem('userId');
  dispatch({type: 'LOGOUT'})
}