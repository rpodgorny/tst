import { connect } from 'react-redux'
import { fetchPlaces } from '../modules/dashboard';
import Dashboard from '../components/dashboard';

const mapStateToProps = (state) => ({
  places : state.places
});

export default connect(mapStateToProps, { fetchPlaces })(Dashboard);
