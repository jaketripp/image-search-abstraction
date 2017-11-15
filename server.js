const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://jake:jake@ds259175.mlab.com:59175/jaketripp-image-search-abstraction");

const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

var Search = mongoose.model('Search', {
	term: {
		type: String,
		required: true,
		trim: true
	},
	when: {
		type: String,
		required: true,
		trim: true
	}
});

app.get('/', (req, res) => {
	res.render('index.html');
});

app.get('/imgsearch/:search', (req, res) => {

	var startIndex = parseInt(req.query.offset) || 1;
  var cx = process.env.CX;
  var key = process.env.APIKEY;
  
	var search = new Search({
		term: req.params.search,
		when: new Date().toISOString()
	});

	search.save().then((doc) => {
		console.log(doc);
	}, (e) => {
		res.status(400).send(e);
	});

	request({
		url: `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&hl=en&searchType=image&q=${req.params.search}&num=10&start=${startIndex}`,
		json: true
	}, function(error, response, body) {

		if (!error && response.statusCode === 200) {
			var obj = body.items.map((item) => {
				return {
					url: item.link,
					snippet: item.snippet,
					thumbnail: item.image.thumbnailLink,
					context: item.image.contextLink
				};
			});
			res.send(obj);
		} else {
			console.log('Unable to fetch data.');
		}

	});
});

app.get('/latest', (req, res) => {
	Search.find().sort({_id:-1}).limit(10).then((searches) => {
		searches = searches.map((obj) => {
			return {
				term: obj.term,
				when: obj.when
		    };
		});
		res.send(searches);
	});
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`Server is up on port ${port}`);
});
