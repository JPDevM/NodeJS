module.exports = {
  index: function (request, response) {
    return response.render('productos');
  },

  show: function (request, response) {
    let productID = Number(request.params.id);

    if (isNaN(productID)) {
      return response.send('El ID debe ser un número');
    }

    return response.send('Llegaste al producto con id: ' + productID);
  },
};

/* 
    Distintas formas de exportar las funciones. 
    
    Declarar las funciones y exportarlas
      function Func1(request, response) {}
      module.exports = { Func1, Func2, func3 };

		Exportar un objeto literales de funciones
			module.exports = { declarar aquí las funciones }
		
		Exportar múltiples objetos literal de funciones
			module.exports = {
			Obj1: { declarar aquí las funciones }, // or whatever you want to assign it to
			Obj2: { declarar aquí las funciones } // again, set it to what you like
		};
 */
