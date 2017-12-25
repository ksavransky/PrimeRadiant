const api = module.exports = require('express').Router()

var Twitter = require('twitter-node-client').Twitter;
var MarkovChain = require('markovchain');
// var MarkovChain = require('markovchain-generate');
 
 
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

function generatePhrase(req, res){
  console.log('in generatePhrase');
  console.log(req.query.text)
  var success = function (phrase) {
    // console.log('Data [%s]', data);
    res.status(200).send(phrase);
  };
  
  // markovchain-generate library code:
  // var chain = new MarkovChain()
  // chain.generateChain(req.query.text);
  // var phrase = chain.generateString();
  
  // markovchain libraray code:
  var chain = new MarkovChain(req.query.text);
  console.log('chain')
  console.log(chain)
  
  var getRandomWord = function(wordBank) {
    if(!wordBank || wordBank === {}) {
      return ''
    }
    var wordsArray = Object.keys(wordBank);
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  }
  
  var phrase = chain.start(getRandomWord(chain.wordBank)).process();
  
  
  
  console.log('phrase')
  console.log(phrase)
  success(phrase);
}

api
  .get('/twitter-search', twitterSearch) 
  .get('/generate-phrase', generatePhrase) 
// No routes matched? 404.
api.use((req, res) => res.status(404).end())


