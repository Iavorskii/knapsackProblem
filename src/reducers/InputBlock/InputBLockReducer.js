import { handleActions, createAction } from 'redux-actions'

export const SET_COST_WEIGHT_ARRAY = 'inputBlock/SET_COST_WEIGHT_ARRAY'
export const SET_KNAPSACK_WEIGHT = 'inputBlock/SET_KNAPSACK_WEIGHT'
export const SET_RANDOM_PARAMS = 'inputBlock/SET_RANDOM_PARAMS'
export const SET_NEED_DECIDE = 'inputBlock/SET_NEED_DECIDE'
export const SET_NUMBER_OF_ITEMS = 'inputBlock/SET_NUMBER_OF_ITEMS'
export const SET_CURRENT_DECISION_METHOD = 'inputBlock/SET_CURRENT_DECISION_METHOD'
export const SET_GENETIC_ALGORITHM_PARAMS = 'inputBlock/SET_GENETIC_ALGORITHM_PARAMS'

export const TOGGLE_RANDOM_FILLING_MODAL = 'inputBlock/TOGGLE_RANDOM_FILLING_MODAL'
export const TOGGLE_GENETIC_MODAL = 'inputBlock/TOGGLE_GENETIC_MODAL'

// time
export const CHANGE_STATISTIC = 'inputBlock/CHANGE_STATISTIC'

export const setCostWeightArray = createAction(SET_COST_WEIGHT_ARRAY)
export const setRandomParams = createAction(SET_RANDOM_PARAMS)
export const setKnapsackWeight = createAction(SET_KNAPSACK_WEIGHT)
export const changeStatistic = createAction(CHANGE_STATISTIC)
export const setNumberOfItems = createAction(SET_NUMBER_OF_ITEMS)
export const setCurrentDecisionMethod = createAction(SET_CURRENT_DECISION_METHOD)
export const setNeedDecide = createAction(SET_NEED_DECIDE)
export const setGeneticAlgorithmParams = createAction(SET_GENETIC_ALGORITHM_PARAMS)

export const toggleAddingModal = createAction(TOGGLE_RANDOM_FILLING_MODAL)
export const toggleGeneticModal = createAction(TOGGLE_GENETIC_MODAL)

const initialState = {
  dataSource: [],
  randomParams: [],
  numberOfItems: 0,
  isOpenAddingModal: false,
  knapsackWeight: null,

  statisticResults: [],
  currentDecisionMethod: '5',
  isNeedToDecide: false,
  geneticAlgorithmParams: {},
  isGeneticModalOpened: false,
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
    [TOGGLE_GENETIC_MODAL]: state => ({
      ...state,
      isGeneticModalOpened: !state.isGeneticModalOpened,
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
    [SET_NEED_DECIDE]: (state, { payload: { isNeedToDecide } }) => ({
      ...state,
      isNeedToDecide,
    }),
    [SET_GENETIC_ALGORITHM_PARAMS]: (state, { payload: { geneticAlgorithmParams } }) => ({
      ...state,
      geneticAlgorithmParams,
    }),
  },
  initialState
)
