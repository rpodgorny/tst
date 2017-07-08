import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Row, Col } from 'react-bootstrap';

import Silo from './silo';
import SiloModalForm from './silo_modal_form';
import styles from './styles.scss';


const _getSilo = (props, name) => props.places.silos[name];

const categoryTitle = (name) => <h3 className="panel-title">{name == 'Prisada' ? 'Přísada' : name}</h3>;

class Dashboard extends React.Component {

  static propTypes = {
    places: PropTypes.shape({
      categories: PropTypes.array.isRequired,
      silos: PropTypes.object.isRequired
    }),
    fetchPlaces: PropTypes.func,
    updateSilo: PropTypes.func
  }

  state = { showEditModal: false, editedSilo: null }

  componentDidMount() {
    this.props.fetchPlaces();
    this.interval = setInterval(() => this.props.fetchPlaces(), 10000);
  }

  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.showEditModal) {
      const editedSilo = _getSilo(nextProps, this.state.editedSilo.name);
      this.setState({ editedSilo });
    }
  }

  editSilo = (editedSilo) => this.setState({ showEditModal: true, editedSilo });

  cancelEdit = () => this.setState({ showEditModal: false, editedSilo: null });

  finishEdit = () => {
    this.props.fetchPlaces();
    this.setState({ showEditModal: false, editedSilo: null });
  };

  updateSilo = (update) => {
    this.props.updateSilo(update, this.state.editedSilo, this.finishEdit);
  }

  render() {
    return (
      <div>
        {this.props.places.categories.map((c, i) => (
          <Panel key={i} header={categoryTitle(c.name)} className={styles.category}>
            <Row>
              {c.silos.map((name, i) => (
                <Col key={i} md={2}>
                  <Silo silo={_getSilo(this.props, name)} onClick={this.editSilo.bind(this)} />
                </Col>
              ))}
            </Row>
          </Panel>
        ))}

        {this.state.showEditModal &&
          <SiloModalForm silo={this.state.editedSilo} onCancel={this.cancelEdit} onSave={this.updateSilo} />
        }
      </div>
    );
  }
}

export default Dashboard;
