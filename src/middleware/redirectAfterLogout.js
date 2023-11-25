const redirectAfterLogoutMiddleware = store => next => action => {
  console.log('Current action:', action);

  if (action.type === 'USER_LOGOUT') {
    localStorage.setItem('userLoggedOut', 'true');
    console.log('User logged out. Setting userLoggedOut flag.');
  }

  if (action.type === 'USER_LOGIN' && localStorage.getItem('userLoggedOut') === 'true') {
    console.log('User logged out. Redirecting to login page.');

    window.location.href = '/login';

    // Clear the logout flag
    localStorage.removeItem('userLoggedOut');
  }

  return next(action);
};

export default redirectAfterLogoutMiddleware;
