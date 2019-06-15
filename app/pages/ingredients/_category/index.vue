<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex sm8>
        <v-card>
          <v-card-title primary-title>
            <h2 class="mx-auto">{{ categoryName }}</h2>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <template v-for="(item, idx) in ingredientList">
                <v-list-tile :key="item.name" @click="detail(item)">
                  <v-list-tile-content>
                    {{ item.name }}
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  v-if="idx + 1 < ingredientList.length"
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
import { mapGetters } from 'vuex'

const CATEGORIES = { main: '主菜', side: '副菜', seasoning: '調味料' }

export default {
  computed: {
    ingredientList() {
      const ingredientData = []
      this.ingredients.forEach(element => {
        if (this.category === element.category) {
          ingredientData.push(element)
        }
      })
      return ingredientData
    },
    ...mapGetters(['ingredients', 'main', 'side', 'seasoning'])
  },
  asyncData({ params }) {
    return {
      ingredientData: [],
      category: `${params.category}`,
      categoryName: CATEGORIES[`${params.category}`]
    }
  },
  methods: {
    ingredientLists() {
      this.ingredients.forEach(element => {
        if (this.category === 'main') {
          this.ingredientData.push(element)
        }
        if (this.category === 'side') {
          this.ingredientData.push(element)
        }
        if (this.category === 'seasoning') {
          this.ingredientData.push(element)
        }
      })
      return this.ingredientData
    },
    detail(ingredient) {
      this.$router.push(ingredient.href)
    }
  }
}
</script>

<style></style>
