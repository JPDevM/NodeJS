module.exports = {
  browse: (request, response) => {
    return response.render('users/browse');
  },

	edit: (request, response) => {
    return response.render('users/edit');
  },

  update: (request, response) => {
		return response.send('The Users Edit One page works ok');
  },

  add: (request, response) => {
    return response.render('users/add');
  },

  create: (request, response) => {
		return response.send('The Users Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Users Delete page works ok');
  },

  read: (request, response) => {
    return response.render('users/read');
  },
}