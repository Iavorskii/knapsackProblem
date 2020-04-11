import DynamicProgrammingAlgorithm from './DynamicProgram'

const testItems = [
  {
    key: 1,
    Name: "Предмет 1",
    Cost: 1,
    Weight: 1,
  },
  {
    key: 2,
    Name: "Предмет 2",
    Cost: 2,
    Weight: 2,
  },
  {
    key: 3,
    Name: "Предмет 3",
    Cost: 3,
    Weight: 3,
  }
]

const expectedSolutionArray = [
  {
    key: 3,
    Name: "Предмет 3",
    Cost: 3,
    Weight: 3,
  }
]

const expectedBenefit = 5
const testWeight = 5

const _ = new DynamicProgrammingAlgorithm()
describe('Тест для разных типов данных maxBenefit', () => {

  test('Сравнение ожидаемой макс. стоимости и получившейся', () => {
      expect(_.dynamicAlgorithm(testItems, testWeight).maxBenefit).toBe(expectedBenefit)
    })
})

describe('Тест для массива-решения', () => {
  test('Сравнение ожидаемого массива с решениями и получившимися', () => {
    const solution= _.dynamicAlgorithm(testItems, testWeight).solutionArray
    expect(solution).toEqual(expectedSolutionArray)
  })
})

function myExpectFunc(value) {
  return {
    toBe: exp => {
      value === exp
        ? console.log('SUCCESS')
        : console.log('ERROR')
    }
  }
}
// TODO
myExpectFunc(_.dynamicAlgorithm(testItems, testWeight).maxBenefit).toBe(expectedBenefit)