const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

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
// 2 READ - See one
router.get('/:id', controller.read);

module.exports = router;
