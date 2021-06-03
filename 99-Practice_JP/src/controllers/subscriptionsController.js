// ------------------------------- //
// Node.JS CONTROLLER subscription //
// ------------------------------- //

// Import models into controller.
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { request, response } = require('express'); // esto por que va?
const { modelSubscription } = require('../database/models');

module.exports = {
  // BROWSE --> See all: Select All subscriptions ('.../')
  browse: async (request, response) => {
    const allSubscription = await modelSubscription;
    return response.json({ allSubscription });

    // try {
    //   // Paginator - Opcional - http://.../subscriptions?page=2
    //   let page = request.query.page || 1;

    //   let allSubscription = await modelSubscription.findAll({
    //     limit: 20,
    //     offset: page === 1 ? 1 : page * 10,
    //   });

    //   //Success
    //   return response.json({
    //     metadata: {
    //       status: 200,
    //       message: 'Success',
    //     },
    //     data: allSubscription,
    //   });
    // } catch (error) {
    //   // Fail
    //   return response.status(500).json({
    //     metadata: {
    //       status: 500,
    //       message: 'Fail a lot',
    //       reason: error,
    //     },
    //   });
    // }
  },

  // 3 EDIT - Edit one (edit form)(view)('.../:id/edit')
  editForm: async (request, response) => {
    const oneSubscription = await modelSubscription.findById(request.params.id);
    response.render('subscriptions/edit', oneSubscription);
  },

  // 4 EDIT - Edit one ('.../:id')
  // TO-DO: terminar el método edit.
  // Renders the editForm
  edit: (request, response) => {
    modelSubscription
      .update({}, { where: { id: request.params.id } })
      .then((modelSubscriptions) => {
        return response.json(modelSubscriptions);
      });
  },

  // 5 CREATE - Add one (creation form)(view) ('.../create')
  createForm: (request, response) => {},

  // 6 CREATE - Add one ('.../')
  // TO-DO: terminar el método add.
  // Renders the editForm

  create: (request, response) => {
    let dataToSave = {
      // Use variable names from the db.
      urlPath: request.body.urlPath, // Constancy in the db: the last argument of the body (urlPath) is the name = "urlPath" tag of the front form.
      description: request.body.description,
      userId: 1,

      isActive: request.body.active === 'si' ? 1 : 0, //dataTypes.INTEGER,
      isPopular: 'true', //dataTypes.INTEGER,
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

    modelSubscription
      .create(dataToSave)
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
    modelSubscription
      .update({ where: { id: request.params.id } })
      .then((modelSubscriptions) => {
        return response.json(modelSubscriptions);
      });
  },

  // 8 SEARCH - Find
  search: (request, response) => {},

  // 2 READ --> See one ('.../:id')
  read: async (request, response) => {
    const oneSubscription = await modelSubscription.findById(request.params.id);
    return response.json(oneSubscription);
  },
};
