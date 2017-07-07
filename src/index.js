import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { store } from './app/store';

import PlacesLayout from './layouts/places';
import Dashboard from './screens/dashboard';

import './styles/bootstrap.css';
import './styles/main.scss';


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

ReactDOM.render(<App />, document.getElementById('root'));
