const isDayOrNight = (hour) => {
	if (isNaN(hour)) {
		return 'Pasame una número';
	}
	if (hour < 0 || hour > 24) {
		return '¿Qué hora es esa?';
	}
	if(hour > 19) {
		return 'Is night';
	}
	return 'Is Day';
}

module.exports = {
	browse: (request, response) => {
		let users = [
			{name: 'Jhon'},
			{name: 'Jane'},
			{name: 'Jim'},
			{name: 'Juan Pa'},
			{name: 'Javi'},
			{name: 'Fran'},
			{name: 'Eme'},
			{name: 'Manu'},
		];
		return response.render('users/browse', {
			users,
			title: 'Listado de Usuarios',
			isDayOrNight
		});
	},
	read: (request, response) => {
		return response.render('users/read');
	},
	edit: (request, response) => {
		// Solo muestra el formulario
		return response.render('users/edit');
	},
	update: (request, response) => {
		// Se encarga de ACTUALIZAR la información en la DB
		return response.send('Update');
	},
	add: (request, response) => {
		// Solo muestra el formulario
		return response.render('users/add');
	},
	create: (request, response) => {
		// Se encarga de CREAR la información en la DB
		return response.send('Add');
	},
	delete: (request, response) => {
		return response.send('Delete');
	},
};
