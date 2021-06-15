const { user } = require('../database/models');

module.exports = {
	auth: async (request, response, next) => {
		let cookieUserId = request.cookies.userId;

		let fakeId = cookieUserId.split('_')[1].split('');
		let realId = fakeId[1] + fakeId[2];

		if (realId) {
			let userFinded = await user.findByPk(realId);
			request.session.userLogged = {
				id: userFinded.id,
				firstName: userFinded.firstName,
				lastName: userFinded.lastName,
				email: userFinded.email,
				isAdmin: userFinded.isAdmin,
			}
		}
		
		if (!request.session.userLogged) {
			return response.redirect('/users/login');
		}
		
		return next();
	}, 

	guest: (request, response, next) => {
		if (request.session.userLogged) {
			return response.redirect('/users/auth/profile');
		}
		return next();
	}
}