const express = require('express');
const app = express();

// Permite recibir información en JSON
app.use(express.json());
// Permite recibir información que venga en el req.body
app.use( express.urlencoded({ extended: false }) );

const moviesRouter = require('./routes/moviesRouter');
app.use('/movies', moviesRouter);

app.get('/actors', (req, res) => {
	actor.findAll()
		.then(data => res.json(data))
})

app.listen(3000, () => console.log('Listening on port 3000'));