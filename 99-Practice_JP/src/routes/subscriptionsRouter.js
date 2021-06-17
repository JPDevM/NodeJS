// -------------------------- //
// Node.JS RUTER subscription //
// -------------------------- //

const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

const controller = require('../controllers/subscriptionsController');

// BREAD: Respond to http://localhost:5000/subscriptions
// 1 BROWSE - See all
router.get('/', controller.browse);
// 4 EDIT - Edit one
router.put('/:id', controller.edit);
// 6 CREATE - Add one
router.post('/', controller.add); // suggested name: CREATE / ADD / STORE
// 7 DELETE - Delete one
router.delete('/:id', controller.delete);
// 8 SEARCH - Find
router.get('/search', controller.search);
// 2 READ - See one
router.get('/:id', controller.read);

module.exports = router;
