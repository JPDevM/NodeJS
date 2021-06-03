// ------------------------ //
// Node.JS CONTROLLER users //
// ------------------------ //

// Import models into controller.
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { request, response } = require('express'); // esto por que va?
const { modelUsers } = require('../database/models');

module.exports = {
  browse: async (request, response) => {
    try {
      const modelUsers = await user.findAll();
      return response.json(modelUsers);
    } catch (error) {
      return response.send('fail fail fail');
    }
  },

  editForm: (request, response) => {
    return response.render('users/editForm');
  },

  // Renders the editForm
  edit: (request, response) => {
    return response.render('users/edit');
  },

  createForm: (request, response) => {
    return response.send('The Users Edit One page works ok');
  },

  // Renders the createForm
  create: async (request, response) => {
    const userCreated = await user.create(request.body);
    return response.json(userCreated);
  },

  delete: (request, response) => {
    return response.send('The Users Delete page works ok');
  },

  search: (request, response) => {
    return response.render('users/search');
  },

  read: (request, response) => {
    return response.render('users/read');
  },
};
