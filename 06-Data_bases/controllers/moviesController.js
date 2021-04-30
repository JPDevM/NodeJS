const { movie } = require('../database/models');
const Op = require('../database/models').Sequelize.Op;

module.exports = {
	all: (req, res) => {
		movie.findAll()
			.then(data => res.json(data))
	},

	top5: (req, res) => {
		movie.findAll({
			order: [
				['rating', 'DESC']
			],
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
		movie.findByPk(req.params.id)
			.then(data => res.json(data))
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
}