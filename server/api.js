const api = module.exports = require('express').Router()

var Twitter = require('twitter-node-client').Twitter;
 
 
function twitterSearch(req, res){
  const config = {
      "consumerKey": "RiG0czyXP878d9Ljnulyjc1dN",
      "consumerSecret": "VjWEZD7tkBWYNXpRecRGwSvGrdHFivQwnZV9BxLDLvNJyC2YUc",
      "accessToken": "	831991073610174464-NJFZAcWY2dNK3N436hkao9vzBr6mcBO",
      "accessTokenSecret": "6UlW8tRzceKgRRkArduRbw9JyT63rfjMQGKrGRJ1mb420",
      "callBackUrl": "http://localhost:3000/"
  }
  var twitter = new Twitter(config);
  var error = function (err, response, body) {
    // console.log('ERROR - err:', err);
    // console.log('ERROR - response:', response);
    res.status(500).send(err);
  };
  var success = function (data) {
    // console.log('Data [%s]', data);
    res.status(200).send(data);
  };
  twitter.getUserTimeline({ screen_name: req.query.userName, count: '10'}, error, success);
}

api
  .get('/twitter-search', twitterSearch) 
// No routes matched? 404.
api.use((req, res) => res.status(404).end())


