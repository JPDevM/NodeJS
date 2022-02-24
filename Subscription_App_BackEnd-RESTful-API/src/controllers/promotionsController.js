module.exports = {
  browse: (request, response) => {
    return response.json({
      endPoint: 'Browse',
    });
  },

  read: (request, response) => {
    return response.json({
      endPoint: 'Read',
    });
  },

  edit: (request, response) => {
    return response.json({
      endPoint: 'Edit',
    });
  },

  add: (request, response) => {
    return response.json({
      endPoint: 'Add',
    });
  },

  delete: (request, response) => {
    return response.json({
      endPoint: 'Delete',
    });
  },

  search: (request, response) => {
    let token = Number(request.query.token);
    let word = request.query.name;

    if (!token || token !== 123456) {
      return response.status(500).json({
        status: 500,
        message: 'Bad request',
        reason: 'Token missmatch',
      });
    }

    return response.json({
      endPoint: 'Search',
      word,
      token,
    });
  },
};
