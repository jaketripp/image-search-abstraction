const express = require('express');
const validUrl = require('valid-url');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://jake:jake@ds259175.mlab.com:59175/jaketripp-image-search-abstraction");

const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// var URL = mongoose.model('URL', {
// 	id: {
// 		type: Number,
// 		required: true,
// 		minLength: 4,
// 		trim: true
// 	},
// 	redirect: {
// 		type: String,
// 		required: true,
// 		trim: true
// 	}
// });

app.get('/', (req, res) => {
	res.render('index.html');
});

// checks some API and returns results
// {
	// url: "http://i0.kym-cdn.com/photos/images/newsfeed/000/024/741/lolcats-funny-picture-lalalalala.jpg",
	// snippet: "Image - 24741] | LOLcats | Know Your Meme",
	// thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3BtcPMrtcKSGJvxwpdTnKmIel1gq3EFU_papXNoGB8L0YZHJdQIN-jGb1",
	// context: "http://knowyourmeme.com/photos/24741-lolcats"
// }
// offset shows the next result
// no offset is 0-10
// offset=1 is 1-11?

// app.get('/api/imagesearch/:search?offset=:offset', (req, res) => {
// 	console.log(req);
// });

// show 9 most recent searchs from database
// app.get('/api/latest/imagesearch', (req, res) => {

// });
// app.get('/:id', (req, res) => {

// 	var id = req.params.id;
// 	// not a number
// 	if (isNaN(id)) {
// 		res.send({
// 			error: "This is not a valid url."
// 		});
// 	}
// 	id = Number(id);

// 	URL.find({ id }).then((url) => {
// 		// couldn't find anything
// 		if (url.length === 0) {
// 			res.send({
// 				error: "This url is not in the database."
// 			});
// 		// success case
// 		} else {
// 			res.redirect(url[0].redirect);
// 		}

// 	}).catch((e) => {
// 		res.status(400).send();
// 	});
// });

// app.get('/new/:url*', (req, res) => {
// 	var randomNum = Math.floor(1000 + Math.random() * 9000);
// 	var url = req.params.url + req.params['0'];
// 	var baseURL = req.headers.host;

// 	var site = new URL({
// 		redirect: url,
// 		id: randomNum
// 	});

// 	if (validUrl.isUri(url)) {
// 		site.save().then((doc) => {
// 			res.send({
// 				original_url: doc.redirect,
// 				short_url: 'http://' + baseURL + '/' + doc.id
// 			});
// 		}, (e) => {
// 			res.status(400).send(e);
// 		});

// 	} else {
// 		res.send({
// 			error: "Wrong url format, make sure you have a valid protocol and real site."
// 		});
// 	}

// });

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`Server is up on port ${port}`);
});

