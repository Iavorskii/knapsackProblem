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

const expectedBenefit = 5
let testWeight = 5

const expectedSolutionArray = [
  {
    key: 3,
    Name: "Предмет 3",
    Cost: 3,
    Weight: 3,
  },
  {
    key: 2,
    Name: "Предмет 2",
    Cost: 2,
    Weight: 2,
  }
]

// describe - Это метод, который принимает в качестве аргументов название теста и стрелочную функцию

// test
describe('Тестирование метода динамического программирования', () => {
  const _ = new DynamicProgrammingAlgorithm()
    // корректные данные
  test('Сравнение ожидаемой макс. стоимости и получившейся', () => {
      expect(_.dynamicAlgorithm(testItems, testWeight).maxBenefit).toBe(expectedBenefit)
    })
    // строка вместо числа
  test('Передача строки вместо числа', () => {
    expect(_.dynamicAlgorithm(testItems, testWeight).maxBenefit).toBe('5')
  })

  test('Сравнение ожидаемого массива с решениями и получившимися', () => {
    const solution= _.dynamicAlgorithm(testItems, testWeight).solutionArray
    expect(solution).toEqual(expectedSolutionArray)
  })
})



