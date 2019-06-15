<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm8>
        <v-card class="mb-2" justify-center>
          <v-card-title primary-title>
            <v-btn
              color="red lighten-5"
              class="mx-auto"
              @click="$router.push('/ingredients/main')"
            >
              主菜
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card class="mb-2">
          <v-card-title primary-title>
            <v-btn
              color="red lighten-5"
              class="mx-auto"
              @click="$router.push('/ingredients/side')"
            >
              副菜
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card class="mb-2">
          <v-card-title primary-title>
            <v-btn
              color="red lighten-5"
              class="mx-auto"
              @click="$router.push('/ingredients/seasoning')"
            >
              調味料
            </v-btn>
          </v-card-title>
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
