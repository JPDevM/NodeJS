const fs = require('fs');
const path = require('path');

// JSON Model
const subsModel = require('../models/jsonModel');
const subs = subsModel('subscriptions.json');

const subscriptionsArray = subs.toArray();

// module.exports = {
	// browse: (request, response) => {
	// 	return response.render('subscriptionsArray/browse');
	// },

module.exports = {
	browse: (request, response) => {
		/*
			request.params().
			objectCount,
			currentPage,
			pageSize,
			totalPage,
			links[first, previous, self, next, last], 
			data[],
		*/
		
		const START_PAGE = 1;
		
		var currentPage = parseInt(request.param('page'));
		var maxPerPage = parseInt(request.param('max_per_page'));
		var totalPage = Math.ceil(subscriptionsArray.length / maxPerPage);

		var nextPage = currentPage >= totalPage ? totalPage : currentPage + 1;
		var lastPage = totalPage;
		var previousPage = currentPage <= START_PAGE ? START_PAGE : currentPage - 1;
		var firstPage = 1;

		if(currentPage < START_PAGE || maxPerPage < START_PAGE) {
			return response.json({
				meta: {
					status: 404,
					message: 'page or max_per_page null value',
				},
			});
		}
		else if(typeof currentPage == 'undefined') {
			// No paso pagina o paso cualquiera gilada
			currentPage = START_PAGE;
		}
		else if(currentPage > totalPage){
			// Se paso 
			currentPage = totalPage;
		}


		var buffer = subscriptionsArray.slice((currentPage-1)*maxPerPage, (currentPage*maxPerPage));

		var responseBuffer = {
			'objectCount': subscriptionsArray.length,
			'currentPage': currentPage,
			'pageSize': maxPerPage,
			'totalPage': totalPage,
			'data': buffer,
			'links': {
				'first': firstPage,
				'previous': previousPage,
				'self': currentPage,
				'next': nextPage,
				'last': lastPage,
			}
		};

		return response.json(responseBuffer);
		//return JSON.parse(responseBuffer);
	},

	// edit: (request, response) => {
	// 	return response.render('subscriptionsArray/edit');
	// },

	update: (request, response) => {
		//return response.send('The SubscriptionsArray Edit One page works ok');
		
		// 1. Buscar el registro que deseamos actualizar
		let theSub = subscriptionsArray.find(function (oneSub) {
			return oneSub.id == request.params.id;
		})

		// 2. Hacer la actualizaciones
		theSub.name = request.body.newName;
		theSub.logoIcon = request.body.newLogoIcon ? request.body.newLogoIcon : theSub.logoIcon;

		// 3. Guardar las actualizaciones en el JSON
		/*
			a. Recorrer el array de subscriptionsArray
			b. Encontrar la susbscription que querés modificar
			c. Volver a guardar todo el JSON
		*/ 

		// 4. Retornar un mensaje de éxito
		return response.json({
			meta: {
				status: 200,
				message: 'successful'
			},
			data: theSub
		});
		
	},

	add: (request, response) => {
		return response.render('subscriptions/add');
	},

	create: (request, response) => {
		let newSubscription = request.body;

		if (isNaN(request.body.price)) {
			return response.status(500).json({
				statusCode: 500,
				message: 'El price debe contener solamente números'
			})
		}

		if (request.body.name === undefined) {
			return response.status(500).json({
				statusCode: 500,
				message: 'El name es necesario para guardar el registro'
			})
		}

		let lastId = subscriptions[subscriptions.length -1].id;

		newSubscription.id = Number(lastId) + 1;

		subscriptions.push(newSubscription);

		fs.writeFileSync(filePath, JSON.stringify(subscriptions, null, ' '));

		return response.json(newSubscription);
	},

	delete: (request, response) => {
		let id = request.params.id;
		let theSubscription = subscriptions.find(function (oneSubscription) {
			return oneSubscription.id === id;
		})
		return response.json({
			subscription: theSubscription,
			message: 'Vamos a borrar esa suscripción'
		});
	},

	read: (request, response) => {
		try {
			let id = request.params.id;
			let theSubscription = subs.find(id);
			if (theSubscription) {
				return response.json(theSubscription)
			}
			return response.status(404).json({
				meta: {
					status: 404,
					message: 'El id no existe'
				}
			})
		} catch (error) {
			return response.status(500).json({
				meta: {
					status: 500,
					message: error
				}
			})
		}
	},

	search: (request, response) => {
		let queryString = request.query;
		
		if (queryString.name) {
			let name = queryString.name;
			let theSubscription = subscriptions.find(function (oneSubscription) {
				return oneSubscription.name.toLowerCase() === name.toLowerCase();
			})
			return response.json(theSubscription);
		}

		return response.send('No se encontró nada');
	}
}