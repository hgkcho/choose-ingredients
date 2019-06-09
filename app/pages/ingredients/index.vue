<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm8>
        <v-card>
          <v-card-title primary-title>
            <h2 class="mx-auto">side</h2>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <template v-for="(item, idx) in vegetableIngredients">
                <v-list-tile :key="item.name" @click="detail(item)">
                  <v-list-tile-content>
                    {{ item.name }}
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  v-if="idx + 1 < vegetableIngredients.length"
                  :key="idx"
                ></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ingredientList from '../../../content/ingredients/json/_summary.json'
export default {
  asyncData() {
    return {
      proteinIngredients: [],
      vegetableIngredients: [],
      seasoningIngredients: []
    }
  },
  created() {
    ingredientList.forEach(ingredient => {
      if (ingredient.name === 'template') {
        return
      }
      if (ingredient.category === 'main') {
        this.proteinIngredients.push(ingredient)
      }
      if (ingredient.category === 'side') {
        this.vegetableIngredients.push(ingredient)
      }
      if (ingredient.category === 'seasoning') {
        this.seasoningIngredients.push(ingredient)
      }
    })
  },
  methods: {
    detail(item) {
      return this.$router.push(item.href)
    }
  }
}
</script>
