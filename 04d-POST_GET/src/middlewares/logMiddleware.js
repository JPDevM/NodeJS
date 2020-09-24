module.exports = (req, res, next) => {
	res.locals.title = 'Website';
	res.locals.tempUser = {
		name: 'Jane doe',
		email: 'jane@email.com'
	}
	next();
}