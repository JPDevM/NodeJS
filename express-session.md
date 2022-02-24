This file is a section of [Workflow to create backend with NodeJS](./README.md).

You can also see the publication in [Medium](https://jpdevm.medium.com/workflow-to-create-backend-with-nodejs-b2ec0efd78d0). 

### Workflow to configure Express-session in NodeJS. + Login implementation. 

> Session data is *not* saved in the cookie itself, just the session ID. Session data is stored server-side.

##### Instal 

```shell
$ npm install express-session
```

These are the routes of the users entity with their respective methods.

In `/src/routes/usersRouter.js` file.

```js
const controller = require('../controllers/usersController');

// BREAD: Respond to http://localhost:5000/users
// 1 BROWSE - See all
router.get('/', controller.browse);
// 3 EDIT - Edit one (edit form)(view)
router.get('/:id/edit', controller.editForm);
// 4 EDIT - Edit one
router.put('/:id', controller.edit);
// 5 CREATE - Add one (creation form)(view)
router.get('/create', controller.createForm);
// 6 CREATE - Add one
router.post('/', controller.create);
// 7 DELETE - Delete one
router.delete('/', controller.delete);
// 8 SEARCH - Find
router.get('/search', controller.search);
// Login Page (Form to login)
router.get('/login', controller.login);
// Login Process
router.post('/login', controller.loginProcess);
// Profile (view)
router.get('/profile', controller.profile);
// Logout process
router.post('/logout', controller.logout);
// 2 READ - See one
router.get('/:id', controller.read);
```

##### Create controller methods.

> To query data from the database we use Sequelize. 

In `/src/controllers/usersController.js` file.

```js
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { request, response } = require('express'); 
const { user } = require('../database/models'); //Sequelize.

// 
const bcrypt = require('bcryptjs');
```

##### Create user.

Renders the view with the create user form.

```js
// Renders the createForm
// 5 CREATE - Add one (creation form)(view) ('.../create')
createForm: (request, response) => {
  return response.render('users/add'); // Ejs
},
```

Put user in db with Sequelize  

```js
// 6 CREATE - Add one ('.../')
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
```

##### Login user

Renders the view with the login user form.

```js
// LOGIN - login user (creation form)(view)('.../login')  
login: (request, response) => {
  return response.render('users/login');
},
```



```js
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

```

 
