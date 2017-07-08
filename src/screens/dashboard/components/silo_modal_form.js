import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Modal, Button, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import Select from 'react-select';

import SiloName from './silo_name';


const mapOption = (name, label) => ({ name, label });

class SiloModalForm extends React.Component {

  static propTypes = {
    silo: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const { silo } = props;
    const { material, minorSilo, substitution } = silo;

    this.state = {
      selectedMaterial: this._selectedMaterial(material),
      selectedMinorSilo:this._selectedMinorSilo(minorSilo),
      selectedSubstitution: substitution == 1,
      ...this._createGeneralState(this.props)
    };

    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const state = this._createGeneralState(nextProps);

    const { silo } = nextProps;
    const { material, minorSilo } = silo;
    const { selectedMaterial, selectedMinorSilo } = this.state;

    if (selectedMaterial && !silo.possibleMaterials[selectedMaterial.name]) {
      state['selectedMaterial'] = this._selectedMaterial(material);
    }
    if (selectedMinorSilo && !silo.possibleMinorSilos.includes(selectedMinorSilo.name)) {
      state['selectedMinorSilo'] = this._selectedMinorSilo(minorSilo);
    }

    this.setState(state);
  }

  _createGeneralState(props) {
    const { silo } = props;
    const materials = _.values(silo.possibleMaterials).map(m => mapOption(m.name, m.label));
    const minorSilos = silo.possibleMinorSilos.map(s => mapOption(s, s));

    return { silo, materials, minorSilos };
  }

  _selectedMaterial = (material) => material ? mapOption(material.name, material.label) : null;

  _selectedMinorSilo = (minorSilo) => minorSilo ? mapOption(minorSilo, minorSilo) : null;

  cancel() {
    this.props.onCancel();
  }

  save(e) {
    e.preventDefault();

    const { selectedMaterial, selectedMinorSilo, selectedSubstitution } = this.state;

    const update = {
      material: selectedMaterial ? { name: selectedMaterial.name, label: selectedMaterial.label } : null,
      minorSilo: selectedMinorSilo ? selectedMinorSilo.name : null,
      substitution: selectedSubstitution ? 1 : 0,
    };
    this.props.onSave(update);
  }

  handleSelectChange(name, value) {
    this.setState({ [name]: value });
  }

  handleCheckboxChange(event) {
    this.setState({ selectedSubstitution: event.target.checked });
  }

  render() {
    return (
      <div>
        <Modal show onHide={this.cancel} bsSize="small">
          <form onSubmit={this.save}>
            <Modal.Header closeButton>
              <Modal.Title><SiloName id={this.state.silo.localId} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Pomocné silo</ControlLabel>
                <Select
                  name="minor-silo"
                  value={this.state.selectedMinorSilo}
                  options={this.state.minorSilos}
                  onChange={this.handleSelectChange.bind(this, 'selectedMinorSilo')}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Materiál</ControlLabel>
                <Select
                  name="material"
                  value={this.state.selectedMaterial}
                  options={this.state.materials}
                  onChange={this.handleSelectChange.bind(this, 'selectedMaterial')}
                />
              </FormGroup>
              <Checkbox checked={this.state.selectedSubstitution} onChange={this.handleCheckboxChange.bind(this)}>
                Možnost náhrady
              </Checkbox>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.cancel}>Zrušit</Button>
              <Button type="submit" bsStyle="primary">Uložit</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SiloModalForm;
