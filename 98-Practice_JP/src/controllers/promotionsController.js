module.exports = {
  browse: (request, response) => {
		return response.send('The Promotions See All page works ok');
  },

	edit: (request, response) => {
		return response.send('The Promotions Edit Form page works ok');
  },

  update: (request, response) => {
		return response.send('The Promotions Edit One page works ok');
  },

  add: (request, response) => {
		return response.send('The Promotions Create Form page works ok');
  },

  create: (request, response) => {
		return response.send('The Promotions Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Promotions Delete page works ok');
  },

  read: (request, response) => {
		return response.send('The Promotions See page works ok');
  },
}