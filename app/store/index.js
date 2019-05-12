import jsonData from '~/assets/json/ingredients.json'

export const state = () => ({
  protein: {},
  vegetable: {},
  seasoning: {},
  selectedIngredient: [],
  ingredients: jsonData
})

export const getters = {
  ingredients: state => state.ingredients,
  protein: state => state.protein,
  vegetable: state => state.vegetable,
  seasoning: state => state.seasoning,
  selectedIngredient: state => state.selectedIngredient
}

export const mutations = {
  addProtein(state, payload) {
    state.protein.id = payload.id
    state.protein.name = payload.name
  },
  clearProtein(state) {
    state.protein = {}
  },
  addVegetable(state, payload) {
    state.vegetable.id = payload.id
    state.vegetable.name = payload.name
  },
  clearVegetable(state) {
    state.vegetable = {}
  },
  addSeasoning(state, payload) {
    state.seasoning.id = payload.id
    state.seasoning.name = payload.name
  },
  clearSeasoning(state) {
    state.seasoning = {}
  },

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
  addProteinAction({ commit }, payload) {
    commit('clearProtein')
    commit('addProtein', payload)
  },
  addVegetableAction({ commit }, payload) {
    commit('clearVegetable')
    commit('addVegetable', payload)
  },
  addSeasoningAction({ commit }, payload) {
    commit('clearSeasoning')
    commit('addSeasoning', payload)
  },
  addSelectedIngredient({ commit }, { payload }) {
    commit('clearSelcted')
    commit('addSelected', { payload })
  },
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
