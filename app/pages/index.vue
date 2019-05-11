<template>
  <v-layout row wrap>
    <v-container>
      <v-card class="my-2 pa-2">
        <v-layout row wrap align-center justify-center>
          <v-card-title primary-title class="title">
            title
          </v-card-title>
        </v-layout>
        <v-layout v-if="hasSelectedIngredients" row wrap>
          <v-flex
            v-for="ingredient in selectedIngredient"
            :key="ingredient.id"
            xs12
            mx-2
            class="text-xs-center selectedIngredient mb-2"
          >
            <v-card color="red lighten-4">
              <v-card-text>
                {{ ingredient.name }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center class="text-xs-center">
          <v-flex
            v-for="ingredient in $store.state.ingredients"
            :key="ingredient.id"
            xs6
            align-center
          >
            <v-card class="ma-2 text-xs-center">
              <v-card-text>
                {{ ingredient.name }}
              </v-card-text>
              <v-card-actions
                justify-center
                align-center
                class="text-xs-center"
              >
                <v-layout column class="text-xs-center">
                  <div>
                    <v-btn outline color="info" class="mb-3">詳しく見る</v-btn>
                  </div>
                  <div>
                    <v-btn
                      outline
                      color="success"
                      @click="addIngredient(ingredient)"
                      >追加</v-btn
                    >
                  </div>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn large outline round color="primary" dark>次へ</v-btn>
        </v-layout>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['ingredients', 'selectedIngredient'])
  },
  methods: {
    hasSelectedIngredients() {
      return this.selectedIngredient !== []
    },
    addIngredient(ingredient) {
      const payload = {
        id: ingredient.id,
        name: ingredient.name
      }
      this.addSelectedIngredient({ payload })
    },
    ...mapActions(['addSelectedIngredient'])
  }
}
</script>

<style scoped>
.selectedIngredients {
  color: var(--v-primary-base);
  background-color: var(--v-accent-lighten2);
}
</style>
