import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Navbar, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
    <Navbar inverse className={styles.appPanel}>
      <Navbar.Header className={styles.header}>
        <Navbar.Brand>
          <span>Asterix Places</span>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Header className={styles.statusItems}>
        <Navbar.Brand>
          {global.loading &&
            <OverlayTrigger placement="bottom" overlay={loadingTooltip}>
              <FontAwesome name="refresh" />
            </OverlayTrigger>
          }
          {global.error &&
            <OverlayTrigger placement="bottom" overlay={errorTooltip}>
              <FontAwesome name="exclamation-circle" />
            </OverlayTrigger>
          }
        </Navbar.Brand>
      </Navbar.Header>
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
