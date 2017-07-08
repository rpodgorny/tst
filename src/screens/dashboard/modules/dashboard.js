import 'regenerator-runtime/runtime';
import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import { getLayout } from '../../../services/api';


const PLACES_FETCH_REQUESTED = 'places/dashboard/PLACES_FETCH_REQUESTED';
const PLACES_FETCH_SUCCEEDED = 'places/dashboard/PLACES_FETCH_SUCCEEDED';
const PLACES_FETCH_FAILED = 'places/dashboard/PLACES_FETCH_FAILED';

const fetchPlacesSagaHandler = function* () {
  try {
    const response = yield call(getLayout);
    yield put({ type: PLACES_FETCH_SUCCEEDED, payload: response.data });
  } catch (e) {
    yield put({ type: PLACES_FETCH_FAILED, payload: e.message });
  }
};

const fetchPlacesSaga = function* () {
  yield takeEvery(PLACES_FETCH_REQUESTED, fetchPlacesSagaHandler);
};

export const sagas = [
  fetchPlacesSaga
];

export const fetchPlaces = () => {
  return { type: PLACES_FETCH_REQUESTED };
};

const mapSilo = (silo, placements) => {
  const info = placements[silo.name];
  return {
    name: silo.name,
    possibleMaterials: _.mapKeys(silo.possible_materials, 'name'),
    possibleMinorSilos: silo.possible_minor_silos,
    material: info && info.name ? { name: info.name, label: info.name_long } : null,
    minorSilo: info ? info.silo_minor : null,
    substitution: info ? info.substitution : 0
  };
};

export default function(state = { categories: [], silos: {} }, action) {
  switch (action.type) {
  case PLACES_FETCH_SUCCEEDED: {
    const { layout, placements } = action.payload;
    const categories = layout.map(l => ({ name: l.name, silos: l.silos.map(s => s.name) }));
    const silos = _.mapKeys(_.flatten(layout.map(l => l.silos)).map(s => mapSilo(s, placements)), 'name');
    return { categories, silos };
  }
  default:
    return state;
  }
}
