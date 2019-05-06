export const state = () => ({
  ingredients: []
})

export const getters = {
  ingredients: state => state.ingredients
}

export const mutations = {
  addIngredient(state, { ingredient }) {
    state.ingredients.push(ingredient)
  },
  clearIngredients(stat) {
    state.ingredients = []
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
  }
}
