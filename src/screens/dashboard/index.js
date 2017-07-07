import {runSaga} from "redux-saga";

import { store, injectReducer, injectSagas } from '../../app/store';
import reducer, { sagas } from './modules/dashboard';

import Dashboard from './containers/dashboard_container';

injectReducer({ key: 'places', reducer });
injectSagas(sagas);

export default Dashboard;
