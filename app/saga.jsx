import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from './common/conf/api.jsx';

function* fetchGonglueData(action) {
    const res = yield call(Api.fetchGonglue, action.data);
    yield put({type: "GONGLUE_LIST_FETCH_DONE", res: res});
}

// function* mySaga() {
//   	yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

function* mySaga() {
  	yield takeLatest("FETCH_GONGLUELIST", fetchGonglueData);
}

module.exports = mySaga;