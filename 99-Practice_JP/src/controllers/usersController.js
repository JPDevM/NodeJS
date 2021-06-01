const { user } = require('../database/models');

module.exports = {
  browse: async (request, response) => {
    const users = await user.findAll();
    return response.json(users);
  },

	edit: (request, response) => {
    return response.render('users/edit');
  },

  update: (request, response) => {
		return response.send('The Users Edit One page works ok');
  },

  // Renders the users create form
  add: (request, response) => {
    return response.render('users/add');
  },

  create: async (request, response) => {
		const userCreated = await user.create(request.body);
    return response.json(userCreated);
  },

  delete: (request, response) => {
		return response.send('The Users Delete page works ok');
  },

  read: (request, response) => {
    return response.render('users/read');
  },
}