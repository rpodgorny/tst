import 'regenerator-runtime/runtime';
import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import update from 'immutability-helper';

import { getLayout, updatePlacement } from '../../../services/api';

const PLACES_FETCH_REQUESTED = 'places/dashboard/PLACES_FETCH_REQUESTED';
const PLACES_FETCH_SUCCEEDED = 'places/dashboard/PLACES_FETCH_SUCCEEDED';
const PLACES_FETCH_FAILED = 'places/dashboard/PLACES_FETCH_FAILED';

const UPDATE_SILO_REQUESTED = 'places/dashboard/UPDATE_SILO_REQUESTED';
const UPDATE_SILO_SUCCEEDED = 'places/dashboard/UPDATE_SILO_SUCCEEDED';
const UPDATE_SILO_FAILED = 'places/dashboard/UPDATE_SILO_FAILED';

const fetchPlacesSagaHandler = function* () {
  try {
    const response = yield call(getLayout);
    yield put({ type: PLACES_FETCH_SUCCEEDED, payload: response.data });
  } catch (e) {
    yield put({ type: PLACES_FETCH_FAILED, payload: e.message });
  }
};

const updateSiloSagaHandler = function* (action) {
  try {
    const { update, silo } = action.payload;
    const data = {
      name: update.material ? update.material.name : null,
      name_long: update.material ? update.material.label : null,
      silo_minor: update.minorSilo,
      substitution: update.substitution,
      type: silo.type,
      subtype: silo.subtype
    };
    const response = yield call(updatePlacement, silo.name, data);
    yield put({ type: UPDATE_SILO_SUCCEEDED, payload: { siloId: silo.name, placement: response.data } });
  } catch (e) {
    yield put({ type: UPDATE_SILO_FAILED, payload: e.message });
  }
};

const fetchPlacesSaga = function* () {
  yield takeEvery(PLACES_FETCH_REQUESTED, fetchPlacesSagaHandler);
};

const updateSiloSaga = function* () {
  yield takeEvery(UPDATE_SILO_REQUESTED, updateSiloSagaHandler);
};

export const sagas = [
  fetchPlacesSaga,
  updateSiloSaga
];

export const fetchPlaces = () => {
  return { type: PLACES_FETCH_REQUESTED };
};

export const updateSilo = (update, silo) => {
  return { type: UPDATE_SILO_REQUESTED, payload: { update, silo } };
};

const mapMaterial = (holder) => ({ name: holder.name, label: holder.name_long });

const mapSilo = (silo, id, placements) => {
  const info = placements[silo.name];
  return {
    localId: id,
    name: silo.name,
    possibleMaterials: _.mapKeys(silo.possible_materials.map(m => mapMaterial(m)), 'name'),
    possibleMinorSilos: silo.possible_minor_silos,
    material: info && info.name ? mapMaterial(info) : null,
    minorSilo: info ? info.silo_minor : null,
    substitution: info ? info.substitution : 0,
    type: info ? info.type : null,
    subtype: info ? info.subtype : null
  };
};

export default function(state = { categories: [], silos: {} }, action) {
  switch (action.type) {
  case PLACES_FETCH_SUCCEEDED: {
    const { layout, placements } = action.payload;
    const categories = layout.map(l => ({ name: l.name, silos: l.silos.map(s => s.name) }));
    const silos = _.mapKeys(_.flatten(layout.map(l => l.silos)).map((s, i) => mapSilo(s, i, placements)), 'name');
    return { categories, silos };
  }
  case UPDATE_SILO_SUCCEEDED: {
    const { categories, silos } = state;
    const { siloId, placement } = action.payload;

    const silo = state.silos[siloId];
    const updated = update(silo, { $merge: {
      material: placement.name ? mapMaterial(placement) : null,
      minorSilo: placement.silo_minor,
      substitution: placement.substitution,
      type: placement.type,
      subtype: placement.subtype
    }});
    silos[siloId] = updated;
    return { categories, silos };
  }
  default:
    return state;
  }
}
