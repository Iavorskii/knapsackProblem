import { handleActions, createAction } from 'redux-actions'

export const SET_COST_WEIGHT_ARRAY = 'inputBlock/SET_COST_WEIGHT_ARRAY'
export const SET_KNAPSACK_WEIGHT = 'inputBlock/SET_KNAPSACK_WEIGHT'
export const SET_RANDOM_PARAMS = 'inputBlock/SET_RANDOM_PARAMS'
export const SET_NUMBER_OF_ITEMS = 'inputBlock/SET_NUMBER_OF_ITEMS'
export const TOGGLE_RANDOM_FILLING_MODAL = 'inputBlock/TOGGLE_RANDOM_FILLING_MODAL'

// time
export const SET_DECISION_RESULT = 'inputBlock/SET_DECISION_RESULT'

export const setCostWeightArray = createAction(SET_COST_WEIGHT_ARRAY)
export const setRandomParams = createAction(SET_RANDOM_PARAMS)
export const toggleRandomFillingModal = createAction(TOGGLE_RANDOM_FILLING_MODAL)
export const setKnapsackWeight = createAction(SET_KNAPSACK_WEIGHT)
export const setDecisionResult = createAction(SET_DECISION_RESULT)
export const setNumberOfItems = createAction(SET_NUMBER_OF_ITEMS)

const initialState = {
  dataSource: [],
  randomParams: [],
  numberOfItems: 0,
  isOpenRandomFillingModal: false,
  knapsackWeight: null,

  statisticResults: [],
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
      isOpenRandomFillingModal: !state.isOpenRandomFillingModal,
    }),
    [SET_RANDOM_PARAMS]: (state, { payload: { randomParams } }) => ({
      ...state,
      randomParams,
    }),
    [SET_KNAPSACK_WEIGHT]: (state, { payload: { knapsackWeight } }) => ({
      ...state,
      knapsackWeight,
    }),
    [SET_DECISION_RESULT]: (state, { payload: { statisticResults } }) => ({
      ...state,
      statisticResults,
    }),
    [SET_NUMBER_OF_ITEMS]: (state, { payload: { numberOfItems } }) => ({
      ...state,
      numberOfItems,
    }),
  },
  initialState
)
