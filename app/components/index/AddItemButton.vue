<template>
  <v-btn
    v-if="category === 'protein'"
    outline
    color="success"
    @click="addProteinAction(item)"
    >add</v-btn
  >
  <v-btn
    v-else-if="category === 'vegetable'"
    outline
    color="success"
    @click="addVegetableAction(item)"
    >add</v-btn
  >

  <v-btn
    v-else-if="category === 'seasoning'"
    outline
    color="success"
    @click="addSeasoningAction(item)"
    >add</v-btn
  >
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddItemButton',
  props: {
    category: {
      type: String,
      required: true,
      validator(value) {
        return ['protein', 'vegetable', 'seasoning'].indexOf(value) !== -1
      }
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['protein', 'vegetable', 'seasoning'])
  },
  methods: {
    isProtein() {
      return this.category === 'protein'
    },
    isVegetable() {
      return this.category === 'vegetable'
    },
    isSeasoning() {
      return this.category === 'seasoning'
    },
    ...mapActions([
      'addProteinAction',
      'addVegetableAction',
      'addSeasoningAction'
    ])
  }
}
</script>

<style></style>
