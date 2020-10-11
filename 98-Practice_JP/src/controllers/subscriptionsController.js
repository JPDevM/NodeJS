module.exports = {
  browse: (request, response) => {
		return response.render('subscriptions/browse');
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
		return response.send('The Subscriptions Add page works ok');
  },

  delete: (request, response) => {
		return response.send('The Subscriptions Delete page works ok');
  },

  read: (request, response) => {
    return response.render('subscriptions/read');
  },
}