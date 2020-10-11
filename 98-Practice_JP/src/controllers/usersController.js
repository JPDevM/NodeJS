module.exports = {
  browse: (request, response) => {
		return response.send('The Users See All page works ok');
  },

	edit: (request, response) => {
		return response.send('The Users Edit Form page works ok');
  },

  update: (request, response) => {
		return response.send('The Users Edit One page works ok');
  },

  add: (request, response) => {
		return response.send('The Users Create Form page works ok');
  },

  create: (request, response) => {
		return response.send('The Users Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Users Delete page works ok');
  },

  read: (request, response) => {
		return response.send('The Users See page works ok');
  },
}