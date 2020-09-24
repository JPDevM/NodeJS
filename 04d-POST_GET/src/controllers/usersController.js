const { validationResult } = require('express-validator');

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
		// Para llegar a este método el Request debe venir por POST
		// console.log('Aca vamos a mostrar la data que vino en el formulario:');
		// console.log(req.body);
		// Acá va toda la lógica para almacenar la información en la DB
		let errors = validationResult(req);
		// console.log(errors.mapped());
		if (errors.errors.length > 0) {
			console.log(errors.mapped());
			return res.render('users/add', {
				errores: errors.mapped()
			});
		}

		return res.send('Se va a crear un usuario');
	},
	delete: (req, res) => {
		return res.send('Delete');
	},
	login: (req, res) => {
		return res.send('Estás en el LOGIN');
	}
};
