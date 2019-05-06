<template>
  <v-layout row wrap>
    <v-container>
      <v-layout row wrap>
        <v-flex
          v-for="ingredient in $store.state.ingredients"
          :key="ingredient.id"
          xs6
        >
          <v-card v-ripple="{ class: 'blue lighten-5' }">
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  // computed: {
  //   ...mapGetters(['ingredients', 'getIngredients']),
  //   ...mapActions(['fetchIngredients'])
  // },
  async asyncData({ store }) {
    // const ingredients = await store.dispatch('fetchIngredients') // eslint-disable-line
    // const ingredients = await ...mapActions(['fetchIngredients'])
  }
}
</script>
