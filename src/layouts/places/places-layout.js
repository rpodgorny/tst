import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';

import styles from './styles.scss';


const PlacesLayout = ({ routes }) => (
  <div>
    <Navbar inverse className={styles.appHeader}>
      <Navbar.Header>
        <Navbar.Brand>
          <span>Asterix Places</span>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    <div className="container">
      {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)}
    </div>
  </div>
);

PlacesLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default PlacesLayout;
