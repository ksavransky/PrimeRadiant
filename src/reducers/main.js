import { TWITTER_SEARCH_RESULTS,  TWITTER_SEARCH_ERROR } from '../actions';

const initialState = {
    searchResults: '',
    phraseResults: ''
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case TWITTER_SEARCH_RESULTS:
            return { ...state, searchResults: action.data }
        case TWITTER_SEARCH_ERROR:
            return { ...state, searchResults: "The User Does Not Exist. Please Search Again." }
        default:
            return state
    }
}

export default main;