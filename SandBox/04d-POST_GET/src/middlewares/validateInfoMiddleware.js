module.exports = (req, res, next) => {
	let theEmail = req.body.email;

	if (theEmail === 'data@gmail.com') {
		return next();
	}

	return res.send('El mail no es el correcto');
};
