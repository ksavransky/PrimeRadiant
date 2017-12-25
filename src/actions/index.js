import axios from 'axios';

export const TWITTER_SEARCH_START = "TWITTER_SEARCH_START";
export const twitterSearchStart = (userName) => {
    return { type: TWITTER_SEARCH_START, userName }
}

export const TWITTER_SEARCH_RESULTS = "TWITTER_SEARCH_RESULTS";
export const twitterSearchResults = (data) => {
    return { type: TWITTER_SEARCH_RESULTS, data }
}

export const TWITTER_SEARCH_ERROR = "TWITTER_SEARCH_ERROR";
export const twitterSearchError = (data) => {
    return { type: TWITTER_SEARCH_ERROR, data }
}

export const TWITTER_SEARCH = "TWITTER_SEARCH";
export const twitterSearch = (userName) => {
    return dispatch => {
        dispatch(twitterSearchStart(userName));
        axios.get(`/api/twitter-search?userName=${userName}`)
            .then(res => dispatch(twitterSearchResults(JSON.stringify(res.data))))
            .catch(err => dispatch(twitterSearchError(err)))

    }
}