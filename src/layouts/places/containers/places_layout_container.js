import { connect } from 'react-redux';
import PlacesLayout from '../components/places_layout';

const mapStateToProps = (state) => ({
  global : state.global
});

export default connect(mapStateToProps)(PlacesLayout);
