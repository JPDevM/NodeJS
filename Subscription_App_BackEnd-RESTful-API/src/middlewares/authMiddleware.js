module.exports = {
  auth: (request, response, next) => {
    if (!request.session.userLogged) {
      return response.redirect('/users/login');
    }
    return next();
  },

  guest: (request, response, next) => {
    if (request.session.userLogged) {
      return response.redirect('/users/read');
    }
    return next();
  },
};
