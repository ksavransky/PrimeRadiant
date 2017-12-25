import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets'
import _ from 'lodash'
import './showTweet.css';

const ShowTweet = ({tweetId, tweetIndex}) => {
  return (
    <div key={tweetIndex} className='tweet-container'>
        <label className='tweet-number-label'>{tweetIndex}</label>
        <Tweet tweetId={tweetId} options={{conversation: 'none', width: '400' }}/>
    </div>
  )
}

export default ShowTweet;