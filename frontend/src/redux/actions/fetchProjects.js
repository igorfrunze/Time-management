// export const fetchProject =
//   (userId, page = 1, limit = 6) =>
//   async (dispatch) => {
//     try {
//       dispatch({type: 'SET_PROJECTS_LOADING'})
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_GET_PROJECT
//         }/${userId}?page=${page}&limit=${limit}`
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch projects');
//       }
//       const data = await response.json();
      
//       dispatch({
//         type: 'SET_PROJECTS',
//         payload: {
//           projects: data.projects,
//           page: data.page,
//           totalPages: data.totalPages,
//         },
//       });
//     } catch (error) {
//       console.error('Error fetching projects', error);
//       throw error;
//     }
//   };

export const fetchProject =
  (userId, page = 1, limit = 6, sortBy = 'desc', filter = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'SET_PROJECTS_LOADING' });
      const response = await fetch(
        `${
          import.meta.env.VITE_GET_PROJECT
        }/${userId}?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${encodeURIComponent(filter)}`
      );

      if (!response.ok) throw new Error('Failed to fetch projects');

      const data = await response.json();

      dispatch({
        type: 'SET_PROJECTS',
        payload: {
          projects: data.projects,
          page: data.page,
          totalPages: data.totalPages,
        },
      });
    } catch (error) {
      console.error('Error fetching projects', error);
      throw error;
    }
  };