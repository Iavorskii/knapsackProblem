export const DEFAULT_POPULATION_SIZE = 25
export const DEFAULT_SELECTION_THRESHOLD = 0.5
export const DEFAULT_MUTATION_RATE = 0.5
export const DEFAULT_NUMBER_OF_CROSSOVER_POINTS = 1
export const DEFAULT_NUMBER_OF_GENERATIONS = 25
export const POPULATION_SIZE_BOUNDS = {
  min: 5,
  max: 25,
}

export const defaultAlgorithmParameters = {
  populationSize: DEFAULT_POPULATION_SIZE,
  crossoverType: 'onePoint',
  selectionType: 'rouletteWheel',
  resamplingType: 'fitnessBased',
  crossoverParams: {
    numberOfCrossoverPoints: DEFAULT_NUMBER_OF_CROSSOVER_POINTS,
    selectionThreshold: DEFAULT_SELECTION_THRESHOLD,
  },
  mutation: {
    mutationRate: DEFAULT_MUTATION_RATE,
  },
  numberOfGenerations: DEFAULT_NUMBER_OF_GENERATIONS,
}
