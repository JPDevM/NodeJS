const fs = require('fs');
const path = require('path');

module.exports = function (fileName) {
	return {
		file: fileName,
		
		toArray () {
			const filePath = path.resolve(__dirname, '../data/', this.file);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			return JSON.parse(fileContent);
		},

		find (id) {
			const fileArray = this.toArray();
			return fileArray.find(function (oneRegister) {
				return oneRegister.id == id;
			})
		},

		pagination () {
			const fileArray = this.toArray();
			var objectCount = fileArray.length;3
		

			return fileArray;
			
			// leer las variables.
			// 1. Define the variables
			
			// objectCount,
			// currentPage,
			// pageSize,
			// totalPage,
			// links[first, previous, self, next, last], 
			// data, //Results.

			// 2. Define the URL and examples.
			// http://${DB_HOST}:${DB_PORT}/path_file.html?key1=value1&key2=value2
			// e.g.: http://localhost:5000/subscriptions/subscriptions.json?page=1&size=20

			// 2. Recibir los resultados filtrados a mostrar.
			// 3. Ver que hacer si los resultados vienen nulos.
			// 4. Devolver un nuevo objeto con el formato del eje.
				/*
						objectCount,
						currentPage,
						pageSize,
						totalPage,
						links[first, previous, self, next, last], 
						data[],
				*/ 				
		},
	}
}



// Ejemplo de como tiene que salir el resultado
// {
// 	"_metadata": 
// 	{
// 			"page": 5,
// 			"per_page": 20,
// 			"page_count": 20,
// 			"total_count": 521,
// 			"Links": [
// 				{"self": "/products?page=5&per_page=20"},
// 				{"first": "/products?page=0&per_page=20"},
// 				{"previous": "/products?page=4&per_page=20"},
// 				{"next": "/products?page=6&per_page=20"},
// 				{"last": "/products?page=26&per_page=20"},
// 			]
// 	},
// 	"data": [
// 		{
// 			"id": 1,
// 			"name": "Widget #1",
// 			"uri": "/products/1"
// 		},
// 		{
// 			"id": 2,
// 			"name": "Widget #2",
// 			"uri": "/products/2"
// 		},
// 		{
// 			"id": 3,
// 			"name": "Widget #3",
// 			"uri": "/products/3"
// 		}
// 	]
// }