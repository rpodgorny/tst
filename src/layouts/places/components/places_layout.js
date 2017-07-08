import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import styles from './styles.scss';


const PlacesLayout = ({ routes, global }) => {


  return (
    <div>
      <Navbar inverse className={styles.appHeader}>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Asterix Places {global.loading} {global.error}</span>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {global.loading && <NavItem><FontAwesome name="refresh" /></NavItem>}
          {global.error && <NavItem><FontAwesome name="exclamation-circle" /></NavItem>}
        </Nav>
      </Navbar>
      <div className="container">
        {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)}
      </div>
    </div>
  );
};

PlacesLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  global: PropTypes.object.isRequired
};

export default PlacesLayout;
