<template>
  <v-layout row wrap justify-center>
    <v-flex xs8>
      <v-list two-line text-xs-center>
        <h1 class="text-center">本日の食材</h1>
        <v-divider mb-5></v-divider>
        <v-layout
          v-for="ingredient in activeIngredients"
          :key="ingredient.name"
          row
          wrap
          mb-2
        >
          <h2 class="mx-auto">{{ ingredient.name }}</h2>
        </v-layout>
      </v-list>
      <v-btn color="info" @click="backPage">戻る</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['activeIngredients'])
  },
  created() {
    const active = this.activeIngredients
    if (
      active.main === null ||
      active.side === null ||
      active.seasoning === null
    ) {
      this.$router.push('/')
    }
  },
  methods: {
    backPage() {
      window.history.back()
    }
  }
}
</script>

<style></style>
