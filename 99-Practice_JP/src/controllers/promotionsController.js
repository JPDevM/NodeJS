module.exports = {
  browse: (request, response) => {
    return response.render('promotions/browse');
  },

	edit: (request, response) => {
    return response.render('promotions/edit');
  },

  update: (request, response) => {
		return response.send('The Promotions Edit One page works ok');
  },

  add: (request, response) => {
    return response.render('promotions/add');
  },

  create: (request, response) => {
		return response.send('The Promotions Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Promotions Delete page works ok');
  },

  read: (request, response) => {
    return response.render('promotions/add');
  },
}