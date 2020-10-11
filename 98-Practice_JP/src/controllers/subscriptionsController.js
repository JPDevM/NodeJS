module.exports = {
  browse: (request, response) => {
		return response.send('The Subscriptions See All page works ok');
  },

	edit: (request, response) => {
		return response.send('The Subscriptions Edit Form page works ok');
  },

  update: (request, response) => {
		return response.send('The Subscriptions Edit One page works ok');
  },

  add: (request, response) => {
		return response.send('The Subscriptions Create Form page works ok');
  },

  create: (request, response) => {
		return response.send('The Subscriptions Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Subscriptions Delete page works ok');
  },

  read: (request, response) => {
		return response.send('The Subscriptions See page works ok');
  },
}