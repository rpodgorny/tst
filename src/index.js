import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { store } from './app/store';

import PlacesLayout from './layouts/places';
import Dashboard from './screens/dashboard';

import './styles/bootstrap.css';//ph: používal bych pouze scss
import './styles/main.scss';

//ph: Route je v tomhle případě trochu zbytečná. Pokud to nebudeš dále rozšiřovat.
const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <PlacesLayout routes={[{path:'/', component: Dashboard }]} />} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const MOUNT_NODE = document.getElementById('root');

/* eslint-disable no-undef */
if (__DEV__) {
  const RedBox = require('redbox-react').default;
  try {
    ReactDOM.render(<App />, MOUNT_NODE);
  } catch (e) {
    ReactDOM.render(<RedBox error={e} />, MOUNT_NODE);
  }
} else {
  ReactDOM.render(<App />, MOUNT_NODE);
}
/* eslint-enable */
