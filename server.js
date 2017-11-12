const express = require('express');
const validUrl = require('valid-url');

const app = express();

var GlobalNum, GlobalURL;

// take in a url as a param
// if invalid url 
// {
// error: "Wrong url format, make sure you have a valid protocol and real site."
// }

// if valid url
// {
// original_url: "https://www.google.com",
// short_url: "https://little-url.herokuapp.com/3364"
// }
app.get('/' + GlobalNum, (req, res) => {
	res.redirect(GlobalURL);
});

app.get('/new/:url*', (req, res) => {

	var url = req.params.url + req.params['0'];
	var baseURL = req.headers.host;
	var randomNum = Math.floor(1000 + Math.random() * 9000);
	GlobalNum = randomNum;
	GlobalURL = url;
	console.log('global url', GlobalURL);
	console.log('global num', GlobalNum);

	if (validUrl.isUri(url)){
	    res.send({
	    	original_url: url,
	    	short_url: baseURL + '/' + GlobalNum.toString()
	    });
	} else {
	    res.send({
			error: "Wrong url format, make sure you have a valid protocol and real site."
		});
	}
});



const port = process.env.PORT || 3001;

app.listen(3001, () => {
	console.log(`Server is up on port ${port}`);
});