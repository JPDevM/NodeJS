// import model into controller.
const { image } = require('../database/models');

const controller = {
  browse: (request, response) => {
    image.findAll().then((images) => {
      return response.json(images);
    });
  },
  // Need edit.
  read: (request, response) => {
    image.findAll().then((images) => {
      return response.json(images);
    });
  },
  // Need edit.
  edit: (request, response) => {
    image.findAll().then((images) => {
      return response.json(images);
    });
  },

  add: (request, response) => {
    let dataToSave = {
      // Use variable names from the db.
      urlPath: request.body.urlPath, // Constancy in the db: the last argument of the body (urlPath) is the name = "urlPath" tag of the front form.
      description: request.body.description,
      userId: 1,
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

  delete: (request, response) => {
    return response.send('The Subscriptions Delete page works ok');
  },
};

module.exports = controller;
