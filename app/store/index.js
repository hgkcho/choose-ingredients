import ingredientData from '~/../content/ingredients/json/_summary.json'

/**
 * state
 */
export const state = () => ({
  ingredients: devideIngredients(),
  main: devideIngredients().main,
  side: devideIngredients().side,
  seasoning: devideIngredients().seasoning,
  activeIngredients: { main: null, side: null, seasoning: null }
})

/**
 * getter
 */
export const getters = {
  ingredients: state => state.ingredients,
  main: state => state.main,
  side: state => state.side,
  seasoning: state => state.seasoning,
  activeIngredients: state => state.activeIngredients
}

/**
 * mutation
 */
export const mutations = {
  addActiveByType(state, payload) {
    if (payload.category === 'main') {
      state.activeIngredients.main = payload
    }
    if (payload.category === 'side') {
      state.activeIngredients.side = payload
    }
    if (payload.category === 'seasoning') {
      state.activeIngredients.seasoning = payload
    }
  },
  clearActiveByType(state, payload) {
    if (payload === 'main') {
      state.activeIngredients.main = null
    }
    if (payload === 'side') {
      state.activeIngredients.side = null
    }
    if (payload === 'seasoning') {
      state.activeIngredients.seasoning = null
    }
  }
}

/**
 * action
 */
export const actions = {
  clearActiveByTypeAction({ commit }, category) {
    commit('clearActiveByType', category)
  },
  addActiveByTypeAction({ commit }, ingredient) {
    commit('clearActiveByType', ingredient.category)
    commit('addActiveByType', ingredient)
  }
}

/**
 * ingredientDataをcategoryによって分類する関数
 */
export function devideIngredients() {
  const mainIngredients = []
  const sideIngredients = []
  const seasoningIngredients = []
  ingredientData.forEach(element => {
    if (element.name === '' || element.name === 'template') {
      return
    }
    if (element.category === 'main') {
      mainIngredients.push(element)
    }
    if (element.category === 'side') {
      sideIngredients.push(element)
    }
    if (element.category === 'seasoning') {
      seasoningIngredients.push(element)
    }
  })
  return {
    main: choose6Randomly(mainIngredients),
    side: choose6Randomly(sideIngredients),
    seasoning: choose6Randomly(seasoningIngredients)
  }
}

/**
 * ingredientを６個の要素に絞る
 *
 * @param {Array} ingredients
 * @returns {Array} sixIngredients
 */
export function choose6Randomly(ingredients) {
  const retArray = []
  while (retArray.length < 6 && ingredients.length > 0) {
    const rand = Math.floor(Math.random() * ingredients.length)
    retArray.push(ingredients[rand])
    ingredients.splice(rand, 1)
  }
  return retArray
}
