// Función declarada (más óptima)
function index(request, response) {
  // El método send() es para enviar información de texto al browser.
  // response.send('Entraste a la home');

  // El método render() es para enviar una vista (archivo html o ejs) al browser.
  // Para poder mostrar una vista en el browser necesitamos hacer uso del método render()
  response.render('home');
}

// Función expresada - función anónima
const about = function (request, response) {
  response.send('Estas en el ABOUT');
};

const api = function (request, response) {
  response.send([{ name: 'Juan Pa' }, { name: 'Javi' }]);
};

module.exports = { index, about, api };
