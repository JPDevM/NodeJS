module.exports = (req, res, next) => {
	// console.log('Pasó por el MD log');
	res.locals.title = 'Website';
	res.locals.tempUser = {
		name: 'Jane doe',
		email: 'jane@email.com'
	}
	next();
}