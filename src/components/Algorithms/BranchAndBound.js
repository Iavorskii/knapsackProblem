/* eslint-disable eqeqeq */
const finalResult = {
  weight: 0,
  optimalValue: 0,
  solution: [],
}
let countNode = 0
let bounds = []

const validateBound = (tempArr, values, finalResult1, bounds1) => {
  // calculate sum value
  let sumValue = 0
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i] === 1) {
      sumValue += values[i]
    }
  }

  if (finalResult1.optimalValue > sumValue + bounds1[tempArr.length - 1]) return false
  return true
}

const dfs = (tempArr, index, weights, values, limitWeight) => {
  countNode++
  // reach the end of state-space search tree
  if (index == weights.length) {
    let sumWeight = 0
    let sumValue = 0

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === 1) {
        sumWeight += weights[i]
        sumValue += values[i]
      }
    }

    // update optimal solution if found
    if (sumWeight <= limitWeight && sumValue > finalResult.optimalValue) {
      finalResult.weight = sumWeight
      finalResult.optimalValue = sumValue
      finalResult.solution = tempArr
      console.log(' finalResult.weight', finalResult.weight)
    }

    return
  }

  if (!validateBound(tempArr, values, finalResult, bounds)) {
    return
  }

  dfs(tempArr.concat(0), index + 1, weights, values, limitWeight)
  dfs(tempArr.concat(1), index + 1, weights, values, limitWeight)
}

const branchAndBound = data => {
  for (let i = data.values.length - 1; i >= 0; i--) {
    bounds = [data.values[i] + (bounds[0] || 0)].concat(bounds)
  }

  dfs([], 0, data.weights, data.values, data.limitWeight)
  finalResult.countNode = countNode
  return finalResult
}

module.exports = branchAndBound
