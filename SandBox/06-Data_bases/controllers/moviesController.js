const { movie } = require('../database/models');
const Op = require('../database/models').Sequelize.Op;
// https://sequelize.org/master/manual/model-querying-basics.html#operators

module.exports = {
	all: (req, res) => {
		movie.findAll({
			include: ['genre', 'actors'],
			limit: 5
		})
			.then(data => {
				let result = {
					prevPage: null,
					nextPage: `${req.protocol}://${req.hostname}/...`,
					movies: data
				};
				res.json(result);
			})
	},

	top5: (req, res) => {
		movie.findAll({
			where: {
				rating: { [Op.gt]: 6 }
			},
			// order: [
			// 	['rating', 'DESC']
			// ],
			limit: 5
		})
			.then(data => res.json(data))
	},

	store: (req, res) => {
		console.log(req.body);

		if (req.body.title == undefined) {
			return res.status(400).json({
				status: 400,
				message: 'The title field is required'
			})
		}

		movie.create(req.body)
			.then(data => res.json(data))
	},

	one: (req, res) => {
		movie.findOne({
			where: {
				title: { [Op.like]: `%${req.params.word}%` }
			}
		})
			.then(data => res.json(data))
	},

	detail: (req, res) => {
		movie.findByPk(req.params.id, {
			include: ['actors', 'genre']
		})
			.then(data => { 
				if (data) {
					const movie = data.dataValues;
					movie.status = 'done';
					return res.json(movie);
				}
				return res.status(404).json({
					status: 'fail',
					message: 'Not found',
					reason: `No movie found with the id: ${req.params.id}`
				})
			})
			.catch(err => console.log(err));
	},
	
	delete: (req, res) => {
		console.log(`Vamos a eliminar la película con id: ${req.params.id}`);
		movie.destroy({
			where: { id: req.params.id },
			// where: { title: { [Op.like] : `Harry%`} }
		})
			.then(data => {
				if (data === 1) {
					return res.json({
						status: 200,
						message: 'Deleted Ok!'
					})
				}

				return res.status(400).json({
					status: 400,
					message: 'Some troubles with your query'
				})
			})
	},

	test: (req, res) => {
		const year = req.params.year;
		const rating = req.params.rating;

		
	}
}