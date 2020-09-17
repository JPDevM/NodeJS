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
	browse: (req, res) => {
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
		return res.render('users/browse', {
			users,
			title: 'Listado de Usuarios',
			isDayOrNight
		});
	},
	read: (req, res) => {
		return res.render('users/read');
	},
	edit: (req, res) => {
		// Solo muestra el formulario
		return res.render('users/edit');
	},
	update: (req, res) => {
		// Se encarga de ACTUALIZAR la información en la DB
		return res.send('Update');
	},
	add: (req, res) => {
		// Solo muestra el formulario
		return res.render('users/add');
	},
	create: (req, res) => {
		// Se encarga de CREAR la información en la DB
		return res.send('Add');
	},
	delete: (req, res) => {
		return res.send('Delete');
	},
};
