import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';

import rootReducer from './app/reducer';

import './styles/main.scss';

const Places = () => (<h1>PLACES MAIN LAYOUT</h1>);

//const Dashboard = () => (<h2>PLACES DASHBOARD</h2>);

const App = () => {

  const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Places} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
