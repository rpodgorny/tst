import 'regenerator-runtime/runtime';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getLayout } from '../../../services/api';


const PLACES_FETCH_REQUESTED = "places/dashboard/PLACES_FETCH_REQUESTED";
const PLACES_FETCH_SUCCEEDED = "places/dashboard/PLACES_FETCH_SUCCEEDED";
const PLACES_FETCH_FAILED = "places/dashboard/PLACES_FETCH_FAILED";

const fetchPlacesSagaHandler = function* () {
  try {
    const response = yield call(getLayout);
    yield put({ type: PLACES_FETCH_SUCCEEDED, payload: response.data });
  } catch (e) {
    yield put({ type: PLACES_FETCH_FAILED, payload: e.message });
  }
}

const fetchPlacesSaga = function* () {
  yield takeEvery(PLACES_FETCH_REQUESTED, fetchPlacesSagaHandler);
}

export const sagas = [
  fetchPlacesSaga
];

export const fetchPlaces = () => {
    return { type: PLACES_FETCH_REQUESTED };
};

export default function(state = {}, action) {
  console.log(action);

  switch (action.type) {
  case PLACES_FETCH_SUCCEEDED:
    return action.payload.layout;
  default:
    return state;
  }
}
