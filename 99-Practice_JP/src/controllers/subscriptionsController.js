const fs = require('fs');
const path = require('path');

// ¿¿¿¿¿ no se por qué se me rompió esto ????
// const filePath = path.resolve(__dirname, './views/subscriptions/');
// const subscriptions = fs.readFileSync(filePath)

module.exports = {
  browse: (request, response) => {
		return response.render('subscriptions/browse');
  },

  // browse: (request, response) => {
  //  	return response.json('')
  // },

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
		return response.send('The Subscriptions Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Subscriptions Delete page works ok');
  },

  read: (request, response) => {
    return response.render('subscriptions/read');
  },
}