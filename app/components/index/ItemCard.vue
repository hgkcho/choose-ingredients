<template>
  <v-card>
    <v-layout row wrap align-center justify-center>
      <v-card-title primary-title class="title">
        {{ title }}
      </v-card-title>
    </v-layout>
    <v-layout row wrap align-center class="text-xs-center">
      <v-flex v-for="ingredient in items" :key="ingredient.id" xs6 align-center>
        <v-card class="ma-2 text-xs-center">
          <v-card-text>
            {{ ingredient.name }}
          </v-card-text>
          <v-card-actions justify-center align-center class="text-xs-center">
            <v-layout column class="text-xs-center">
              <div>
                <v-btn outline color="info" class="mb-3">詳しく見る</v-btn>
              </div>
              <div>
                <AddItemButton :category="category" :item="ingredient" />
                <!-- <v-btn
                  outline
                  color="success"
                  @click="addIngredient(ingredient)"
                  >追加</v-btn
                > -->
              </div>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddItemButton from '~/components/index/AddItemButton'

export default {
  name: 'ItemCard',
  components: {
    AddItemButton
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'unchi'
    },
    category: {
      type: String,
      required: true
    },
    items: {
      type: Object,
      required: false,
      default: () => ['naef', 'f']
    }
  },
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

<style scoped></style>
