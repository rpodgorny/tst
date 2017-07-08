import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Row, Col } from 'react-bootstrap';

import Silo from './silo';
import styles from './styles.scss';


const categoryTitle = (name) => <h3 className="panel-title">{name == 'Prisada' ? 'Přísada' : name}</h3>;

class Dashboard extends React.Component {

  static propTypes = {
    places: PropTypes.shape({
      categories: PropTypes.array.isRequired,
      silos: PropTypes.object.isRequired
    }),
    fetchPlaces: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchPlaces();
  }

  _getSilo = (name) => this.props.places.silos[name];

  render() {
    return (
      <div>
        {this.props.places.categories.map((c, i) => (
          <Panel key={i} header={categoryTitle(c.name)} className={styles.category}>
            <Row>
              {c.silos.map((name, i) => (
                <Col key={i} md={2}>{<Silo id={i} silo={this._getSilo(name)} />}</Col>)
              )}
            </Row>
          </Panel>
        ))}
      </div>
    );
  }
}

export default Dashboard;
