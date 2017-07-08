import React from 'react';
import PropTypes from 'prop-types';

const SiloName = ({ id }) => (<span>Zásobník {id + 1}</span>);

SiloName.propTypes = {
  id: PropTypes.number.isRequired
};

export default SiloName;
