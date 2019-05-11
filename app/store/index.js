import jsonData from '~/assets/json/ingredients.json'

export const state = () => ({
  selectedIngredient: [],
  ingredients: jsonData
})

export const getters = {
  ingredients: state => state.ingredients,
  selectedIngredient: state => state.selectedIngredient
}

export const mutations = {
  addIngredient(state, { ingredient }) {
    state.ingredients.push(ingredient)
  },
  clearIngredients(state) {
    state.ingredients = []
  },
  addSelected(state, { payload }) {
    state.selectedIngredient.push({
      id: payload.id,
      name: payload.name
    })
  },
  clearSelcted(state) {
    state.selectedIngredient = []
  }
}

export const actions = {
  async fetchIngredients({ commit }) {
    const ingredients = await this.$axios.$get(
      'https://api.myjson.com/bins/zh3ac'
    )
    commit(`clearIngredients`)
    Object.entries(ingredients || [])
      .reverse()
      .forEach(([id, content]) =>
        commit('addIngredient', {
          ingredient: {
            id,
            ...content
          }
        })
      )
  },
  addSelectedIngredient({ commit }, { payload }) {
    commit('clearSelcted')
    commit('addSelected', { payload })
  }
}
