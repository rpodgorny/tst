import { connect } from 'react-redux';
import { fetchPlaces, updateSilo } from '../modules/dashboard';
import Dashboard from '../components/dashboard';

const mapStateToProps = (state) => ({
  places : state.places
});

export default connect(mapStateToProps, { fetchPlaces, updateSilo })(Dashboard);
