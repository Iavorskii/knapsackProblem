import React from 'react'
import PropTypes from 'prop-types'
import EvolutionaryAlgorithm from 'genetics-js/lib/lib/algorithms/EvolutionaryAlgorithm'
import {
  BinaryIndividual,
  OnePointCrossover,
  BitwiseMutation,
  NPointsCrossover,
  UniformCrossover,
} from 'genetics-js'
import BinaryGenerator from 'genetics-js/lib/lib/generator/binary/BinaryGenerator'
import FitnessProportionalSelection from 'genetics-js/lib/lib/selection/base/FitnessProportionalSelection'
import StochasticUniversalSampling from 'genetics-js/lib/lib/selection/implementation/StochasticUniversalSamplingSe'
import RouletteWheel from 'genetics-js/lib/lib/selection/implementation/RouletteWheel'
import FitnessBased from 'genetics-js/lib/lib/selection/replacement/FitnessBased'
import AgeBased from 'genetics-js/lib/lib/selection/replacement/AgeBased'
import MaxGenerations from 'genetics-js/lib/lib/termination/MaxGenerations'
import { nativeMath } from 'random-js'
import CommonResultTable from '../../../containers/DecisionBlock/CommonResultTable'

let resultsItems = []
let fittest = {}

let start
let end

export default class GeneticAlgorithm extends React.Component {
  constructor(props) {
    super(props)
    const params = this.constructParams(props)
    this.algorithm = new EvolutionaryAlgorithm(params)
    this.state = {
      algorithmIsRunning: false,
      algorithm: new EvolutionaryAlgorithm(params),
    }
  }

  componentDidMount() {
    resultsItems = []

    start = performance.now()
    this.onRunClick()
    end = performance.now()
  }

  fitnessFunction = individual => {
    const { dataSource, knapsackWeight } = this.props
    let weight = 0.0
    let cost = 0.0
    individual.forEach((gene, index) => {
      if (gene) {
        const item = dataSource[index]
        weight += item.Weight
        cost += item.Cost
      }
    })
    if (weight <= knapsackWeight) {
      return cost
    }
    return 0.0
  }

  constructParams = props => {
    const { dataSource, geneticAlgorithmParams } = props
    const {
      populationSize,
      crossoverType,
      selectionType,
      mutation: { mutationRate },
      resamplingType,
      numberOfGenerations,
    } = geneticAlgorithmParams

    let crossover
    let crossoverParams
    const { numberOfCrossoverPoints, selectionThreshold } = geneticAlgorithmParams.crossoverParams

    switch (crossoverType) {
      case 'onePoint': {
        crossover = new OnePointCrossover()
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual,
        }
        break
      }
      case 'nPoints': {
        crossover = new NPointsCrossover()
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual,
          numberOfCrossoverPoints,
        }
        break
      }
      case 'uniform': {
        crossover = new UniformCrossover()
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual,
          selectionThreshold,
        }
        break
      }
      default:
        break
    }

    const params = {
      populationSize,
      generator: new BinaryGenerator(),
      generatorParams: {
        chance: 0.3,
        engine: nativeMath,
        length: dataSource.length,
      },
      selection: new FitnessProportionalSelection(),
      selectionParams: {
        engine: nativeMath,
        selectionCount: populationSize,
        subSelection:
          selectionType === 'rouletteWheel'
            ? new RouletteWheel()
            : new StochasticUniversalSampling(),
      },
      crossover,
      crossoverParams,
      mutation: new BitwiseMutation(),
      mutationParams: {
        engine: nativeMath,
        mutationRate,
      },
      replacement: resamplingType === 'fitnessBased' ? new FitnessBased() : new AgeBased(),
      replacementParams: {
        selectionCount: populationSize,
      },
      fitnessFunction: this.fitnessFunction,
      terminationCondition: new MaxGenerations(numberOfGenerations),
    }
    return params
  }

  nextGeneration = () => {
    this.algorithm.nextGeneration()
    this.setState({ algorithm: this.algorithm })
  }

  onRunClick = async () => {
    const { algorithmIsRunning } = this.state
    if (algorithmIsRunning) {
      clearInterval(this.timer)
      this.setState({ algorithmIsRunning: false })
    } else {
      this.timer = setInterval(this.nextGeneration, 50)
      this.setState({ algorithmIsRunning: true })
    }
  }

  knapsackCalculator = (individual, dataSource) => {
    let cost = 0.0
    let weight = 0.0
    individual.forEach((gene, index) => {
      if (gene) {
        const item = dataSource[index]
        cost += item.Cost
        weight += item.Weight
      }
    })
    return { cost, weight }
  }

  result = () => {
    const {
      algorithm: { population },
    } = this.state
    const { dataSource } = this.props
    const fittestIndividual = population.getFittestIndividualItem().individual
    fittest = this.knapsackCalculator(fittestIndividual, dataSource)
    dataSource.map((item, key) => (fittestIndividual.get(key) ? resultsItems.push(item) : null))
    return { resultsItems, fittest }
  }

  refreshStatistic = (decisionTime, maxBenefit) => {
    const { changeStatistic } = this.props

    const methodName = 'Генетический алгоритм'
    const currentStatistic = {
      methodName,
      decisionTime,
      maxBenefit,
    }
    changeStatistic({ currentStatistic })
  }

  render() {
    const {
      algorithm: { generations },
    } = this.state
    const { geneticAlgorithmParams } = this.props

    if (generations === geneticAlgorithmParams.numberOfGenerations) {
      // this.setState({ algorithmIsRunning: false })
      clearInterval(this.timer)
      // this.setState({ isLoading: false })
      this.result()
      this.refreshStatistic(end - start, fittest.cost)
    }

    // this.result()

    return <CommonResultTable resultDataSource={resultsItems || []} />
  }
}

GeneticAlgorithm.propTypes = {
  dataSource: PropTypes.array,
  changeStatistic: PropTypes.func,
  knapsackWeight: PropTypes.number,
  geneticAlgorithmParams: PropTypes.object,
}
