import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {

  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object),
    fetchPlaces: PropTypes.func
  }

  render() {

    const p = this.props.places ? this.props.places.length : 0;

    return (
      <div>
        <h1>DASHBOARD XXX, categories: {p}</h1>
        <button onClick={() => this.props.fetchPlaces()}>FETCH</button>
      </div>
    );
  }
}

export default Dashboard;