import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './main';

const Reducers = combineReducers({
    main,
    routing: routerReducer
});

export default Reducers;
