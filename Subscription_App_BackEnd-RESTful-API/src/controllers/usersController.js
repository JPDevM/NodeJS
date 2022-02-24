// ------------------------ //
// Node.JS CONTROLLER users //
// ------------------------ //

// Import models into controller.
// A the destructuring, using the table name in the model.
const { user } = require('../database/models');

const bcrypt = require('bcryptjs');

module.exports = {
  // BROWSE --> See all. ('.../')
  browse: async (request, response) => {
    try {
      const allUsers = await user.findAll();
      //Success
      return response.json({
        metadata: {
          status: 200,
          message: 'Success',
        },
        data: allUsers,
      });
    } catch (error) {
      // Fail
      return response.status(500).json({
        metadata: {
          status: 500,
          message: 'Could not list from database.',
          reason: error,
        },
      });
    }
  },

  // 3 EDIT - Edit one (edit form)(view)('.../:id/edit')
  editForm: (request, response) => {
    try {
      const userToEdit = request.params;
      // Success
      return response.json({
        metadata: {
          status: 200,
          message: 'Success',
        },
        data: userToEdit,
      });
    } catch (error) {
      // Fail
      return response.status(500).json({
        metadata: {
          status: 500,
          message: 'Could not list from database.',
          reason: error,
        },
      });
    }
  },

  // 4 EDIT - Edit one ('.../:id')
  edit: (request, response) => {
    return response.render('users/edit');
  },

  // 5 CREATE - Add one (creation form)(view) ('.../create')
  createForm: (request, response) => {
    return response.render('users/add');
  },

  // 6 CREATE - Add one ('.../')
  create: async (request, response) => {
    try {
      const userToCreate = {
        ...request.body,
        password: bcrypt.hashSync(request.body.password, 11),
      };
      // Success
      const userCreated = await user.create(userToCreate);
      // TODO -> make automatic login
      // TODO -> If email exist, solve this error.
      return response.redirect('/users/login');
    } catch (error) {
      // Fail
      return response.status(500).json({
        metadata: {
          status: 500,
          message: 'Could not list from database.',
          reason: error,
        },
      });
    }
  },

  // 7 DELETE --> Delete one ('.../:id')
  delete: (request, response) => {
    return response.send('The Users Delete page works ok');
  },

  // 8 SEARCH - Find
  search: (request, response) => {
    return response.render('users/search');
  },

  // 2 READ --> See one ('.../:id')
  read: async (request, response) => {
    try {
      const oneUser = await user.findOne({ where: { id: request.params.id } });
      return response.render('users/read', oneUser);
    } catch (error) {
      // Fail
      return response.status(500).json({
        metadata: {
          status: 500,
          message: 'Could not list from database.',
          reason: error,
        },
      });
    }
  },

  // LOGING
  login: (request, response) => {
    return response.render('users/login');
  },

  loginProcess: async (request, response) => {
    // 1. Search the user by email
    const userByEmail = await user.findOne({
      where: { email: request.body.email },
    });

    // 2. If user exists, we'll to compare the passwords
    if (userByEmail) {
      const userPassword = userByEmail.password;
      const userFromLoginForm = request.body.password;
      const isSamePassword = bcrypt.compareSync(
        userFromLoginForm,
        userPassword
      );

      // 2.a. If passwords are the same, so we'll to let the user get inside
      if (isSamePassword) {
        request.session.userLogged = {
          id: userByEmail.id,
          firstName: userByEmail.firstName,
          lastName: userByEmail.lastName,
          email: userByEmail.email,
        };
        // TODO: Remember user - COOKIES
        // Success
        return response.redirect('/users/profile');
      }

      // 2.b. If passwords doesn't match, we'll alert to user
      return response.send('Hey, you have credentials problems! 🤥');
    }

    // 3. If user doesn't exist
    return response.send('Hey, you have credentials problems! 😔');
  },

  // Profile view ('.../profile)
  profile: async (request, response) => {
    const user = request.session.userLogged;
    console.log(user);
    return response.render('index', user);
  },

  // Loguot
  logout: (request, response) => {
    request.session.destroy();
    return response.redirect('/user/login');
  },
};
