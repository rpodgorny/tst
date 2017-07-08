import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import SiloName from './silo_name';

import styles from './styles.scss';


const EMPTY = '(prázdný)';

const minorSiloTooltip = (
  <Tooltip id="minor-silo-tooltip">Pomocný zásobník</Tooltip>
);

const substitutionTooltip = (
  <Tooltip id="minor-silo-tooltip">Možnost náhrady</Tooltip>
);

const renderMinorSiloInfo = (id) => (
  <span className={styles.minorSiloInfo}>
    <span>{id}</span>
    <OverlayTrigger placement="top" overlay={minorSiloTooltip}>
      <FontAwesome name="database" />
    </OverlayTrigger>
  </span>
);

const renderSubstitutionInfo = () => (
  <span className={styles.substitution}>
    <OverlayTrigger placement="bottom" overlay={substitutionTooltip}>
      <FontAwesome name="retweet" />
    </OverlayTrigger>
  </span>
);

const Silo = ({ silo, onClick }) => (
  <Panel className={styles.silo} onClick={() => onClick(silo)}>
    <div>
      <span><SiloName id={silo.localId} /></span>
      {silo.minorSilo && renderMinorSiloInfo(silo.minorSilo)}
    </div>
    <div>
      <span>{silo.material ? silo.material.label : EMPTY}</span>
      {silo.substitution == 1 && renderSubstitutionInfo()}
    </div>
  </Panel>
);

Silo.propTypes = {
  silo: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default Silo;
