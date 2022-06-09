import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, singleProductReducer } from './Reducers/productReducer';

const reducer = combineReducers({
  productList: productReducer,
  productDetails: singleProductReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store