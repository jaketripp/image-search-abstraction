const express = require('express');
const validUrl = require('valid-url');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://jake:jake@ds157325.mlab.com:57325/jaketripp-url-shortener");

const app = express();

app.use(bodyParser.json());

var URL = mongoose.model('URL', {
	id: {
		type: Number,
		required: true,
		minLength: 4,
		trim: true
	},
	redirect: {
		type: String,
		required: true,
		trim: true
	}
});

app.get('/:id', (req, res) => {
	// if id is not a number
		// {
		//  error: "This is not a valid url."
		// }
	// find id in db
	// if you can
	// redirect to associated link
	// if not
		// {
		//  error: "This url is not on the database."
		// }
	var id = req.params.id;
	// not a number
	if (isNaN(id)) {
		res.send({
			error: "This is not a valid url."
		});
	}
	id = Number(id);

	URL.find({id}).then((url) => {
		// couldn't find anything
		if (url.length === 0) {
			res.send({
				error: "This url is not in the database."
			});
			return;
		// success case
		} else {
			res.redirect(url[0].redirect);
			return;
		}
	}).catch((e) => {
		res.status(400).send();
	});	
});

app.get('/new/:url*', (req, res) => {
	var randomNum = Math.floor(1000 + Math.random() * 9000);
	var url = req.params.url + req.params['0'];
	var baseURL = req.headers.host;

	var site = new URL({
		redirect: url,
		id: randomNum
	});

	site.save().then((doc) => {
		if (validUrl.isUri(url)) {
			res.send({
				original_url: doc.redirect,
				short_url: baseURL + '/' + doc.id
			});
		} else {
			res.send({
				error: "Wrong url format, make sure you have a valid protocol and real site."
			});
		}
	}, (e) => {
		res.status(400).send(e);
	});

});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`Server is up on port ${port}`);
});