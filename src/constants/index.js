export const decisionMethods = {
  brandAndBound: '1',
  dynamicProgram: '2',
  greedyAlgorithm: '3',
  exhaustiveSearch: '4',
}

export const courseTitle =
  'Реализация точного алгоритма решения задачи о рюкзаке с помощью метода динамического программирования'

export const diplomaTitle = 'Решение задачи о рюкзаке приближенными и точными методами'

export const menuItems = [
  {
    title: 'Жадный алгоритм',
    key: decisionMethods.greedyAlgorithm,
    icon: '',
  },
  {
    title: 'Метод ветвей и границ',
    key: decisionMethods.brandAndBound,
    icon: '',
  },
  {
    title: 'Метод полного перебора',
    key: decisionMethods.exhaustiveSearch,
    icon: '',
  },
  {
    title: 'Метод дин. программирования',
    key: decisionMethods.dynamicProgram,
    icon: '',
  },
]
