import { TWITTER_SEARCH_RESULTS,  TWITTER_SEARCH_ERROR, GENERATE_PHRASE_RESULTS, GENERATE_PHRASE_ERROR } from '../actions';

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
        case GENERATE_PHRASE_RESULTS:
            return { ...state, phraseResults: action.data }
        case GENERATE_PHRASE_ERROR:
            return { ...state, phraseResults: "" }
        default:
            return state
    }
}

export default main;