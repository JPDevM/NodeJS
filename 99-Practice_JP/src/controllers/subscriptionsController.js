const { query } = require('express');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../data/subscriptions.json');
const subscriptionsString = fs.readFileSync(filePath, 'utf-8');
const subscriptions = JSON.parse(subscriptionsString);

module.exports = {
  // browse: (request, response) => {
	// 	return response.render('subscriptions/browse');
  // },

  browse: (request, response) => {
    return response.json(subscriptions);
  },

	edit: (request, response) => {
		return response.render('subscriptions/edit');
  },

  update: (request, response) => {
		return response.send('The Subscriptions Edit One page works ok');
  },

  add: (request, response) => {
		return response.render('subscriptions/add');
  },

  create: (request, response) => {
    let newSubscription = request.body;

    if (isNaN(request.body.price)) {
      return response.status(500).json({
        statusCode: 500,
        message: 'El price debe contener solamente números'
      })
    }

    if (request.body.name === undefined) {
      return response.status(500).json({
        statusCode: 500,
        message: 'El name es necesario para guardar el registro'
      })
    }

    let lastId = subscriptions[subscriptions.length -1].id;

    newSubscription.id = Number(lastId) + 1;

    subscriptions.push(newSubscription);

    fs.writeFileSync(filePath, JSON.stringify(subscriptions, null, ' '));

    return response.json(newSubscription);
  },

  delete: (request, response) => {
    let id = request.params.id;
    let theSubscription = subscriptions.find(function (oneSubscription) {
      return oneSubscription.id === id;
    })
		return response.json({
      subscription: theSubscription,
      message: 'Vamos a borrar esa suscripción'
    });
  },

  read: (request, response) => {
    let id = request.params.id;
    let theSubscription = subscriptions.find(function (oneSubscription) {
      return oneSubscription.id === id;
    })
    return response.json(theSubscription)
  },

  search: (request, response) => {
    let queryString = request.query;
    
    if (queryString.name) {
      let name = queryString.name;
      let theSubscription = subscriptions.find(function (oneSubscription) {
        return oneSubscription.name.toLowerCase() === name.toLowerCase();
      })
      return response.json(theSubscription);
    }

    return response.send('No hay nada para buscar');
  }
}