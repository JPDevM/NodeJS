// ------------------------------- //
// Node.JS CONTROLLER subscription //
// ------------------------------- //

// Import models into controller.
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { request, response } = require('express'); // esto por que va?
const { Subscription } = require('../database/models');

module.exports = {
  // BROWSE --> See all: Select All subscriptions ('.../')
  browse: async (request, response) => {
    try {
      const allSubscriptions = await Subscription.findAll({
        include: ['color'] // Tiene que se el mismo texto que usamos en la propiedad "as" de la relación
      });
      return response.status(200).json({ 
        status: 200,
        msg: 'request done',
        results: allSubscriptions,
        total: allSubscriptions.length
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: 'request fail',
        problem: error
      });
    }
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

  // 6 ADD - Add one ('.../')
  // TO-DO: terminar el método add.
  // Renders the editForm

  add: async (request, response) => {
    let dataToSave = {
      // Use variable names from the db.
      urlPath: request.body.urlPath, // Constancy in the db: the last argument of the body (urlPath) is the name = "urlPath" tag of the front form.
      description: request.body.description,
      userId: request.body.userId,
      isActive: request.body.isActive == 'ok' ? 1 : 0, //dataTypes.INTEGER,
      isPopular: request.body.isPopular == 'ok' ? 1 : 0, //dataTypes.INTEGER,
      name: request.body.name, //dataTypes.STRING,
      logoIcon: request.body.logoIcon, //dataTypes.STRING,
      logo: request.body.logo, //dataTypes.STRING,
      price: request.body.price, //dataTypes.DECIMAL(10, 2),
      firstPayment: request.body.firstPayment, //dataTypes.DATE(),
      recurrency: request.body.recurrency, //dataTypes.STRING,
      longDate: request.body.longDate, //dataTypes.DATE(),
      notification: request.body.notificacion, //{
      currency: request.body.currency, //dataTypes.STRING,
      style: request.body.style, //dataTypes.STRING,
      colorId: request.body.colorId, //dataTypes.INTEGER,
    };

    // ToDO - Backend validation - some fields

    try {
      let subscriptionStored = await Subscription.create(dataToSave);
      return response.send({
        status: 200,
        message: 'done',
        data: subscriptionStored,
      });
      
    } catch (error) {
      return response.status(504).send({
        status: 504,
        message: 'Can\'t save the register in DB.',
        error
      });
    }
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
    try {
      const oneSubscription = await Subscription.findByPk(request.params.id, { include: ['color', 'user'] });
      return response.status(200).json({
        status: 200,
        msg: oneSubscription ? 'request done' : 'register is not in DB',
        result: oneSubscription,
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: 'request fail',
        problem: error
      });
    }
  },
};
