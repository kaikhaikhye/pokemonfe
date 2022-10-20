import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  const middleware = [thunk]

  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)))

  return store
}