<template>
  <v-layout row wrap justify-center>
    <v-container grid-list-xs>
      <v-list two-line text-xs-center>
        <v-layout row wrap ma-3>
          <h1 class="mx-auto">本日の食材</h1>
        </v-layout>
        <v-layout
          v-for="ingredient in activeIngredients"
          :key="ingredient.name"
          row
          wrap
          ma-2
        >
          <h2 class="mx-auto">{{ ingredient.name }}</h2>
        </v-layout>
      </v-list>
      <v-btn
        fixed
        round
        bottom="16px"
        color="info"
        class="backButton"
        @click="backPage"
        >戻る</v-btn
      >
    </v-container>
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
