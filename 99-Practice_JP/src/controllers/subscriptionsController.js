// ------------------------------- //
// Node.JS CONTROLLER subscription //
// ------------------------------- //

// Import models into controller.
// al desestructurar es necesario usar el mismo nombre que dimos al momento de crear el modelo.
const { modelSubscription } = require('../database/models');

const controller = {
  // BROWSE --> See all: Select All subscriptions
  browse: (request, response) => {
    modelSubscription.findAll().then((modelSubscriptions) => {
      return response.json(modelSubscriptions);
    });
  },

  // READ --> See one: SELECT * FROM subscriptions WHERE id = http://... .../subscriptions/id
  read: (request, response) => {
    modelSubscription
      .findById({
        where: { id: request.params.id },
      })
      .then((modelSubscriptions) => {
        return response.json(modelSubscriptions);
      });
  },

  // EDIT --> Edit one:
  // TO-DO: terminar el método edit.
  edit: (request, response) => {
    modelSubscription.findAll().then((modelSubscriptions) => {
      return response.json(modelSubscriptions);
    });
  },

  // ADD --> Add one:
  // TO-DO: terminar el método add.
  add: (request, response) => {
    let dataToSave = {
      // Use variable names from the db.
      urlPath: request.body.urlPath, // Constancy in the db: the last argument of the body (urlPath) is the name = "urlPath" tag of the front form.
      description: request.body.description,
      userId: 1,

      isActive: request.body.active, //dataTypes.INTEGER,
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
      currency: '', //dataTypes.STRING,
      style: '', //dataTypes.STRING,
      userId: '', //dataTypes.INTERGER,
      colorId: '', //dataTypes.INTEGER,
    };

    image
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

  // DELETE --> Delete one:
  // TO-DO: terminar el método delete.
  delete: (request, response) => {
    return response.send('The Subscriptions Delete page works ok');
  },
};

module.exports = controller;
