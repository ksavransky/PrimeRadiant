import React, { Component } from 'react';
import InputRow from './inputRow.jsx'
import _ from 'lodash'
import './markovChainMaker.css';


class MarkovChainMaker extends Component {

  constructor(props){
    super(props)
    this.state = {
      probabilities: null,
      startingLink: 1,
      tweetIdArray: null,
      currentConfigLink: 1,
      saveMessage: '',
      saveError: false
    }
    this.setInitialProbabilities = this.setInitialProbabilities.bind(this)
    this.getStartingLinkDropDown = this.getStartingLinkDropDown.bind(this)
    this.getProbabiltyForm = this.getProbabiltyForm.bind(this)
    this.getProbabiltyInputs = this.getProbabiltyInputs.bind(this)
  }

  componentDidMount(){
    this.setState({
      probabilities: this.setInitialProbabilities()
    })
  }

  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps)){
      this.setState({
        probabilities: this.setInitialProbabilities(nextProps)
      })
    }
  }

  setInitialProbabilities(nextProps){
    let { numberOfTweets } = nextProps || this.props
    let tweetIdArray = [];
    for (let i = 1; i <= numberOfTweets; i++){
        tweetIdArray.push(i);
    }
    this.setState({
      tweetIdArray: tweetIdArray
    })
    let probabilities = {}
    for (let j = 1; j <= numberOfTweets; j++) {
      probabilities[j] = tweetIdArray
    }
    return probabilities
  }

  createChain(){
    let chain = [this.state.startingLink.toString()]
    let stepProbabilityArray = this.state.probabilities[this.state.startingLink]
    for (let i = 1; i < this.props.numberOfTweets; i++){
      let randTweetId = stepProbabilityArray[Math.floor(Math.random() * stepProbabilityArray.length)];
      chain.push(randTweetId.toString())
      stepProbabilityArray = this.state.probabilities[randTweetId]
    }
    this.props.setMarkovOrder(chain)
  }

  setCurrentConfigLink(){
    let newCurrentConfigLinkValue = parseInt(this.refs.currentConfigLinkDropDown.value)
    if (newCurrentConfigLinkValue !== this.state.currentConfigLink) {
      this.setState({
        currentConfigLink: newCurrentConfigLinkValue
      })
    }
  }

  getProbabiltyInputs(){
    return (
      <div className='probability-inputs-container' ref='probabilityInputs'>
          <div className='probability-labels'>
            <h6>Next Tweet</h6>
            <h6>Probability</h6>
          </div>
          {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <InputRow key={key} nextTweetId={key} probabilityArrayAtCurrentLink={this.state.probabilities[this.state.currentConfigLink]} />) : ''}
      </div>
    );
  }

  getProbabiltyForm(){
    return (
      <div className='probability-form-container'>
        <div className='divider'></div>
        <h5 className='change-probabilities-label'>Change Chain Probabilities</h5>
        <div className='explanation'>Choose a tweet (Markov link) and set probabilities for the tweet that will appear after the choosen tweet appears.</div>
        <div className='input-pair'>
          <h6>Set Link</h6>
          <select onChange={this.setCurrentConfigLink.bind(this)} ref='currentConfigLinkDropDown'>
            {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <option key={key} selected={this.state.currentConfigLink === key ? 'selected' : '' } value={key}>Tweet {key}</option>) : ''}
          </select>
        </div>
        {this.getProbabiltyInputs()}
      </div>
    )
  }

  setStartingLink(){
    let newStartingLinkValue = parseInt(this.refs.startingLinkDropDown.value)
    if (newStartingLinkValue !== this.state.startingLink) {
      this.setState({
        startingLink: newStartingLinkValue
      })
    }
  }

  getStartingLinkDropDown(){
    return (
      <div className='input-pair'>
        <div className='divider top start'></div>
        <h5 className='starting-link'>Starting Link</h5>
        <select onChange={this.setStartingLink.bind(this)} ref='startingLinkDropDown'>
          {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <option key={key} selected={this.state.startingLink === key ? 'selected' : '' } value={key}>Tweet {key}</option>) : ''}
        </select>
      </div>
    )
  }

  getArraySum(total, num) {
      return total + num;
  }

  saveProbabilities(){
    let probabilityArray = []
    _.forEach(this.refs.probabilityInputs.getElementsByTagName('input'), input => {
      probabilityArray.push(parseInt(input.value))
    })
    let probabilitiesSum = probabilityArray.reduce(this.getArraySum);
    if (probabilitiesSum !== this.state.tweetIdArray.length) {
      this.setState({
        saveMessage: 'Probabilities must sum to ' + this.state.tweetIdArray.length + '. Please change input values accordingly.',
        saveError: true
      })
    } else {
      let probabilityArrayNormalized = []
      probabilityArray.forEach((num, index) => {
        for (let i = 0; i < num; i++){
          probabilityArrayNormalized.push(index + 1)
        }
      })
      let probabilitiesObj = _.clone(this.state.probabilities)
      probabilitiesObj[this.state.currentConfigLink] = probabilityArrayNormalized
      this.setState({
        saveMessage: 'Saved Changes for Link ' + this.state.currentConfigLink + '.',
        saveError: false,
        probabilities: probabilitiesObj
      })
    }
  }

  render() {
    return (
      <div id='config-container'>
        {this.getStartingLinkDropDown(this.props.numberOfTweets)}
        <button className='button create-chain' onClick={this.createChain.bind(this)}>Create Tweets Chain</button>
        {this.getProbabiltyForm()}
        <button className='button save-probabilities' onClick={this.saveProbabilities.bind(this)}>Save</button>
        <h6 className='save-message' style={{color: this.state.saveError ? 'red' : 'green' }}>{this.state.saveMessage}</h6>
      </div>
    );
  }
}

export default MarkovChainMaker;