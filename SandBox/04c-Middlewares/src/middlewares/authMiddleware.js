module.exports = (req, res, next) => {
	const isLogged = true;
	if (!isLogged) {
		console.log('Si se muestra esto, pasó por el MD de auth');
		return res.redirect('/usuarios/login');
	}
	console.log('Si se muestra esto: la persona pudo acceder a /productos');
	req.testeo = {
		'mensaje': 'Esto se está creando desde el MD',
	}
	next();
}