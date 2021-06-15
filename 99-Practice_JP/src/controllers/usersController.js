// ------------------------ //
// Node.JS CONTROLLER users //
// ------------------------ //

// Import models into controller.
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { request, response } = require('express'); // esto por que va?
const { user } = require('../database/models');

const bcrypt = require('bcryptjs');

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

  // Renders the createForm
  createForm: (request, response) => {
    return response.render('users/add');
  },

  create: async (request, response) => {
    const userToCreate = {
      ...request.body,
      password: bcrypt.hashSync(request.body.password, 11)
    }
    const userCreated = await user.create(userToCreate);
    console.log(userCreated);
    
    // TODO -> make automatic login
    return response.redirect('/users/login');
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

  login: (request, response) => {
    return response.render('users/login');
  },
  
  loginProcess: async (request, response) => {
    // 1. Search the user by email
    const userByEmail = await user.findOne({ where: { email: request.body.email } });

    // 2. If user exists, we'll to compare the passwords
    if (userByEmail) {
      const userPassword = userByEmail.password;
      const userFromLoginForm = request.body.password;
      const isSamePassword = bcrypt.compareSync(userFromLoginForm, userPassword);

      // 2.a. If passwords are the same, so we'll to let the user get inside
      if (isSamePassword) {
        request.session.userLogged = {
          id: userByEmail.id,
          firstName: userByEmail.firstName,
          lastName: userByEmail.lastName,
          email: userByEmail.email,
          isAdmin: userByEmail.isAdmin,
        }

        // 2.b. If the user checks the remember input
        if(request.body.remember) {
          let cookieAge = (((1000 * 60) * 60) * 24) * 30;
          let fakeId = `${new Date().getTime()}_0${userByEmail.id}0_${(new Date().getTime() + 12345)}`;

          response.cookie('userId', fakeId, { maxAge: cookieAge });
        }

        return response.redirect('/users/auth/profile');
      }

      // 2.b. If passwords doesn't match, we'll alert to user
      return response.send('Hey, you have credentials problems! 🤥');
    }

    // 3. If user doesn't exist
    return response.send('Hey, you have credentials problems! 😔');
  },

  profile: async (request, response) => {
    const user = request.session.userLogged;
    return response.render('users/profile', { user });
  },

  logout: (request, response) => {
    request.session.destroy();
    response.clearCookie('userId');
    return response.redirect('/users/login');
  }

};
