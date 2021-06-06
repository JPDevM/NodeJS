// ------------------------------- //
// Node.JS CONTROLLER subscription //
// ------------------------------- //

// Import models into controller.
// A the destructuring, using the table name in the model.
const { request, response } = require('express');
const { Subscription } = require('../database/models');

module.exports = {
  // BROWSE --> See all. ('.../')
  browse: async (request, response) => {
    try {
      const allSubscription = await Subscription.findAll();
      //Success
      return response.json({
        metadata: {
          status: 200,
          message: 'Success',
        },
        data: allSubscription,
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
  editForm: async (request, response) => {
    const oneSubscription = await Subscription.findByPk(request.params.id).then(
      (data) => console.log(data)
    );
    // try {
    //   // Recupero values y los paso al formulario
    //   .then(oneSubscription) => response.json(oneSubscription));
    // } catch (error) {
    //   return response.status(500).json({
    //     metadata: {
    //       status: 500,
    //       message: 'FAIL Recupero values y los paso al formulario.',
    //       reason: error,
    //     },
    //   });
    // }

    // try {
    //   const userId = request.params.id;
    //   const oneSubscription = await Subscription.edit(userId);
    //   return response.render('subscriptions/read', oneSubscription);
    // } catch (error) {
    //   // Fail
    //   return response.status(500).json({
    //     metadata: {
    //       status: 500,
    //       message: 'No se pudo listar los usuatos de la db',
    //       reason: error,
    //     },
    //   });
    // }
  },

  // 4 EDIT - Edit one ('.../:id')
  edit: (request, response) => {
    Subscription.update({}, { where: { id: request.params.id } }).then(
      (subscription) => {
        return response.json(subscription);
      }
    );
  },

  // 5 CREATE - Add one (creation form)(view) ('.../create')
  createForm: (request, response) => {},

  // 6 CREATE - Add one ('.../')
  create: (request, response) => {
    let dataToSave = {
      // Use variable names from the db.
      urlPath: request.body.urlPath, // Constancy in the db: the last argument of the body (urlPath) is the name = "urlPath" tag of the front form.
      description: request.body.description,
      userId: 1,
      isActive: request.body.active === 'si' ? 1 : 0, //dataTypes.INTEGER,
      isPopular: request.body.isPopular === 'si' ? 1 : 0, //dataTypes.INTEGER,
      name: '', //dataTypes.STRING,
      logoIcon: '', //dataTypes.STRING,
      logo: '', //dataTypes.STRING,
      description: '', //dataTypes.STRING,
      price: '', //dataTypes.DECIMAL(10, 2),
      firstPayment: '', //dataTypes.DATE(),
      recurrency: '', //dataTypes.STRING,
      longDate: '', //dataTypes.DATE(),
      notification: '', //{
      currency: request.body.currency, //dataTypes.STRING,
      style: '', //dataTypes.STRING,
      userId: '', //dataTypes.INTERGER,
      colorId: '', //dataTypes.INTEGER,
    };

    Subscription.create(dataToSave)
      // Success message.
      .then((data) => {
        return response.send({
          status: 200,
          message: 'done',
          data: data,
        });
      })
      // Error message. Optional; when not saved in the db.
      .catch((error) => {
        return response.status(504).send({
          status: 504,
          message: 'Imposible guardar en la DB.',
        });
      });
  },

  // 7 DELETE --> Delete one ('.../:id')
  // TO-DO: terminar el método delete.
  delete: (request, response) => {
    Subscription.update({ where: { id: request.params.id } }).then(
      (subscription) => {
        return response.json(subscription);
      }
    );
  },

  // 8 SEARCH - Find
  search: (request, response) => {},

  // 2 READ --> See one ('.../:id')
  read: async (request, response) => {
    const oneSubscription = await Subscription.findById(request.params.id);
    return response.json(oneSubscription);
  },
};
