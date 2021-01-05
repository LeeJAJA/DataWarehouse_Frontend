import generateEffect from '@/utils/generateEffect'
import generateReducer, {
  defaultArrayTransformer,
  defaultObjectTransformer,
} from '@/utils/generateReducer'
import * as MovieService from './service'
import moment from "moment";

const defaultNewContest = {
  title: null,
  participantNumber: 3,
  startTime: null,
  endTime: null,
  description: null,
  chapter: null,
  questions: [],
}

const defaultPagination = {
  total: 0,
  pageNum: 1,
  pageSize: 10,
}

const defaultState = {
  currentTab: 'tab1',
  currentTab2: 'tab1',
  movieList1: [],
  movieList2: [],
  movieList3: [],
  movieList4: [],
}

const effects = {
  onTabChange: generateEffect(function* ({ payload }, { put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of tab: ', payload)
    yield put({
      type: 'setCurrentTab',
      payload,
    })
  }),
  onTabChange2: generateEffect(function* ({ payload }, { put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of tab: ', payload)
    yield put({
      type: 'setCurrentTab2',
      payload,
    })
  }),
  conditionQuery: generateEffect(function* ({ payload }, { call, put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', {
      title: payload.title ? payload.title : undefined,
      genre: payload.genre ? payload.genre : undefined,
      actor: payload.actor ? payload.actor : undefined,
      leadActor: payload.leadActor ? payload.leadActor : undefined,
      director: payload.director ? payload.director : undefined,
      startTime: payload.dateRange ? moment(payload.dateRange[0]).format('YYYY-MM-DD') : undefined,
      endTime: payload.dateRange ? moment(payload.dateRange[1]).format('YYYY-MM-DD') : undefined,
      scoreLargerThan: payload.scoreRange ? payload.scoreRange[0] : undefined,
      scoreLessThan: payload.scoreRange ? payload.scoreRange[1]  : undefined,
    })
    const res = yield call(MovieService.fetchConditionQueryList, {
      title: payload.title ? payload.title : undefined,
      genre: payload.genre ? payload.genre : undefined,
      actor: payload.actor ? payload.actor : undefined,
      leadActor: payload.leadActor ? payload.leadActor : undefined,
      director: payload.director ? payload.director : undefined,
      startTime: payload.dateRange ? moment(payload.dateRange[0]).format('YYYY-MM-DD') : undefined,
      endTime: payload.dateRange ? moment(payload.dateRange[1]).format('YYYY-MM-DD') : undefined,
      scoreLargerThan: payload.scoreRange ? payload.scoreRange[0] : undefined,
      scoreLessThan: payload.scoreRange ? payload.scoreRange[1]  : undefined,
    })
    console.log("response", res.movieList)
    yield put({
      type: 'setCurrentMovieList1',
      payload: res.movieList,
    })
  }),
  versionQuery: generateEffect(function* ({ payload }, { call, put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', {
      title: payload.title ? payload.title : undefined,
    })
    const res = yield call(MovieService.fetchVersionQueryList, {
      title: payload.title ? payload.title : undefined,
    })
    console.log("response", res.movieList)
    yield put({
      type: 'setCurrentMovieList2',
      payload: res.movieList,
    })
  }),
  reviewQuery: generateEffect(function* ({ payload }, { call, put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', {
      title: payload.title ? payload.title : undefined,
    })
    const res = yield call(MovieService.fetchReviewQueryList, {
      title: payload.title ? payload.title : undefined,
    })
    console.log(res)
    console.log("response", res.reviewList)
    yield put({
      type: 'setCurrentMovieList3',
      payload: res.reviewList,
    })
  }),
  corrQuery: generateEffect(function* ({ payload }, { call, put }) {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', {
      title: 10,
      type: payload.type ? payload.type : undefined,
      pid: payload.pid ? payload.pid : undefined,
    })
    const res = yield call(MovieService.fetchCorrQueryList, {
      title: 10,
      type: payload.type ? payload.type : undefined,
      pid: payload.pid ? payload.pid : undefined,
    })
    console.log("response", res.rankingList)
    yield put({
      type: 'setCurrentMovieList4',
      payload: res.rankingList,
    })
  }),
}

const reducers = {
  setCurrentTab: generateReducer({
    attributeName: 'currentTab',
    transformer: (payload) => payload,
    defaultState,
  }),
  setCurrentTab2: generateReducer({
    attributeName: 'currentTab2',
    transformer: (payload) => payload,
    defaultState,
  }),
  setCurrentMovieList1: generateReducer({
    attributeName: 'movieList1',
    transformer: defaultArrayTransformer,
    defaultState,
  }),
  setCurrentMovieList2: generateReducer({
    attributeName: 'movieList2',
    transformer: defaultArrayTransformer,
    defaultState,
  }),
  setCurrentMovieList3: generateReducer({
    attributeName: 'movieList3',
    transformer: (payload) => payload,
    defaultState,
  }),
  setCurrentMovieList4: generateReducer({
    attributeName: 'movieList4',
    transformer: defaultArrayTransformer,
    defaultState,
  }),
}

export default {
  namespace: 'movie',
  state: defaultState,
  effects,
  reducers,
}
