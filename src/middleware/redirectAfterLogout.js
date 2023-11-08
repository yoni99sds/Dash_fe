
const redirectAfterLogoutMiddleware = store => next => action => {
    if (action.type === 'USER_LOGOUT') {
      localStorage.setItem('userLoggedOut', 'true'); // Set the logout flag in localStorage
    }
  
    if (action.type === 'USER_LOGIN' && localStorage.getItem('userLoggedOut') === 'true') {
      // Redirect to the login page if the user logged out
      // You can use your preferred routing method (e.g., React Router)
      window.location.href = '/login';
    }
  
    return next(action);
  };
  
  export default redirectAfterLogoutMiddleware;
  