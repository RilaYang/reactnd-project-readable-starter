import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import { PropTypes } from 'prop-types'

import App from './containers/App';

const Root=  ({store}) => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root

