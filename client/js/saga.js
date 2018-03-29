import { call, put, all, takeEvery } from 'redux-saga/effects'
import api from './api'

function* fetchReviews (action) {
  console.log('Fetch Reviews Saga running');
  console.log('Action: ', action);
  console.log('API: ', api.getReviews);
  try {
    const data = yield api.getReviews(action.params)
    console.log('Data?: ', data);
    yield put({ type: 'FETCHING_REVIEWS_SUCCESS', data });
  } catch (e) {
    console.log('Error: ', e);
    yield put({ type: 'FETCHING_REVIEWS_FAILURE' });
  }
}
function* fetchUserData (action) {
  try {
    const data = yield api.getUserData(action.id)
    yield put({ type: 'FETCHING_USERDATA_SUCCESS', id: action.id, data });
  } catch (e) {
    yield put({ type: 'FETCHING_USERDATA_FAILURE'});
  }
}
const sagas = [
  takeEvery('FETCHING_REVIEWS', fetchReviews),
  takeEvery('FETCHING_USERDATA', fetchUserData)
];

const testSaga = [
  call(fetchReviews, {params: { id: '--cjBEbXMI2obtaRHNSFrA'}})
]
function* rootSaga () {
  console.log('Root Saga running');
  yield all([
    ...sagas
  ]);
}

export default rootSaga;