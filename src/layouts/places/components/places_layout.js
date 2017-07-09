import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Navbar, Nav, NavItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import styles from './styles.scss';


const loadingTooltip = (
  <Tooltip id="loading-tooltip">Načítám...</Tooltip>
);

const errorTooltip = (
  <Tooltip id="error-tooltip">Došlo k chybě spojení, zkuste obnovit aplikaci.</Tooltip>
);

const PlacesLayout = ({ routes, global }) => (
  <div>
    <Navbar inverse className={styles.appHeader}>
      <Navbar.Header>
        <Navbar.Brand>
          <span>Asterix Places {global.loading} {global.error}</span>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        {global.loading &&
          <NavItem>
            <OverlayTrigger placement="bottom" overlay={loadingTooltip}>
              <FontAwesome name="refresh" />
            </OverlayTrigger>
          </NavItem>
        }
        {global.error &&
          <NavItem>
            <OverlayTrigger placement="bottom" overlay={errorTooltip}>
              <FontAwesome name="exclamation-circle" />
            </OverlayTrigger>
          </NavItem>
        }
      </Nav>
    </Navbar>
    <div className="container">
      {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)}
    </div>
  </div>
);

PlacesLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  global: PropTypes.object.isRequired
};

export default PlacesLayout;
