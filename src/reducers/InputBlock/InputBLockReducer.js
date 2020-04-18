import { handleActions, createAction } from 'redux-actions'

export const SET_COST_WEIGHT_ARRAY = 'inputBlock/SET_COST_WEIGHT_ARRAY'
export const SET_KNAPSACK_WEIGHT = 'inputBlock/SET_KNAPSACK_WEIGHT'
export const SET_RANDOM_PARAMS = 'inputBlock/SET_RANDOM_PARAMS'
export const SET_NUMBER_OF_ITEMS = 'inputBlock/SET_NUMBER_OF_ITEMS'
export const SET_CURRENT_DECISION_METHOD = 'inputBlock/SET_CURRENT_DECISION_METHOD'
export const TOGGLE_RANDOM_FILLING_MODAL = 'inputBlock/TOGGLE_RANDOM_FILLING_MODAL'

// time
export const CHANGE_STATISTIC = 'inputBlock/CHANGE_STATISTIC'

export const setCostWeightArray = createAction(SET_COST_WEIGHT_ARRAY)
export const setRandomParams = createAction(SET_RANDOM_PARAMS)
export const toggleAddingModal = createAction(TOGGLE_RANDOM_FILLING_MODAL)
export const setKnapsackWeight = createAction(SET_KNAPSACK_WEIGHT)
export const changeStatistic = createAction(CHANGE_STATISTIC)
export const setNumberOfItems = createAction(SET_NUMBER_OF_ITEMS)
export const setCurrentDecisionMethod = createAction(SET_CURRENT_DECISION_METHOD)

const initialState = {
  dataSource: [
    { key: 0, Name: 'Предмет 0', Cost: 7, Weight: 4 },
    { key: 1, Name: 'Предмет 1', Cost: 5, Weight: 8 },
    { key: 2, Name: 'Предмет 2', Cost: 5, Weight: 3 },
    { key: 3, Name: 'Предмет 3', Cost: 7, Weight: 9 },
    { key: 4, Name: 'Предмет 4', Cost: 7, Weight: 4 },
  ],
  randomParams: [],
  numberOfItems: 0,
  isOpenAddingModal: false,
  knapsackWeight: null,

  statisticResults: [],
  currentDecisionMethod: '1',
}

export default handleActions(
  {
    [SET_COST_WEIGHT_ARRAY]: (state, { payload: { dataSource } }) => {
      return {
        ...state,
        dataSource,
        // numberOfItems,
      }
    },
    [TOGGLE_RANDOM_FILLING_MODAL]: state => ({
      ...state,
      isOpenAddingModal: !state.isOpenAddingModal,
    }),
    [SET_RANDOM_PARAMS]: (state, { payload: { randomParams } }) => ({
      ...state,
      randomParams,
    }),
    [SET_KNAPSACK_WEIGHT]: (state, { payload: { knapsackWeight } }) => ({
      ...state,
      knapsackWeight,
    }),
    [CHANGE_STATISTIC]: (state, { payload: { currentStatistic } }) => ({
      ...state,
      statisticResults: [...state.statisticResults, currentStatistic],
    }),
    [SET_NUMBER_OF_ITEMS]: (state, { payload: { numberOfItems } }) => ({
      ...state,
      numberOfItems,
    }),
    [SET_CURRENT_DECISION_METHOD]: (state, { payload: { currentDecisionMethod } }) => ({
      ...state,
      currentDecisionMethod,
    }),
  },
  initialState
)
