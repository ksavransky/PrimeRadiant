import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: ''
    }
  }
  
  componentDidMount(){
    document.addEventListener('keydown', this.enterSubmit.bind(this))
  }
  
  componentWillUnmount(){
    document.removeEventListener('keydown', this.enterSubmit.bind(this))
  }
  
  enterSubmit(event){
    if(event.keyCode === 13) {
      this.getTweets()
    }
  }
  
  getTweets(){
    // this.props.actions.twitterSearch(this.refs.search.value === '' ? NOT_REAL_USER : this.refs.search.value)
  }

  render() {
    return (
      <div id='app'>
        Hi
      </div>
    );
  }
}


export default App;
