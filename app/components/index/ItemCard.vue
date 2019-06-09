<template>
  <v-card>
    <v-layout row wrap align-center justify-center>
      <v-card-title primary-title class="title">
        {{ title }}
      </v-card-title>
    </v-layout>

    <v-layout v-if="isMain()" row wrap align-center class="text-xs-center">
      <v-flex
        v-for="ingredient in main"
        :key="ingredient.name"
        xs6
        align-center
      >
        <v-hover>
          <v-card
            :class="{ ext: main.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-layout v-if="isSide()" row wrap align-center class="text-xs-center">
      <v-flex
        v-for="ingredient in side"
        :key="ingredient.name"
        xs6
        align-center
      >
        <v-hover>
          <v-card
            :class="{ ext: activeIngredient.side.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-layout v-if="isSeasoning()" row wrap align-center class="text-xs-center">
      <v-flex
        v-for="ingredient in seasoning"
        :key="ingredient.name"
        xs6
        align-center
      >
        <v-hover>
          <v-card
            :class="{ ext: seasoning.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ItemCard',
  props: {
    title: {
      type: String,
      required: true,
      default: 'unchi'
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeIngredient: {
        main: '',
        side: '',
        seasoning: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'main',
      'side',
      'seasoning',
      'ingredients',
      'selectedIngredient'
    ])
  },
  methods: {
    hasSelectedIngredients() {
      return this.selectedIngredient !== []
    },
    /**
     * activeなingredientを切り替える
     *
     * @param {Array} ingredient
     */
    toggleIngredient(ingredient) {
      if (ingredient.category === 'main') {
        if (this.activeIngredient.main === ingredient) {
          this.activeIngredient.main = ''
          this.clearActiveByTypeAction(ingredient)
        } else {
          this.activeIngredient.main = ingredient
          this.addActiveByTypeAction(ingredient)
        }
      }
      if (ingredient.category === 'side') {
        if (this.activeIngredient.side === ingredient) {
          this.activeIngredient.side = ''
          this.clearActiveByTypeAction(ingredient)
        } else {
          this.activeIngredient.side = ingredient
          this.addActiveByTypeAction(ingredient)
        }
      }
      if (ingredient.category === 'seasoning') {
        if (this.activeIngredient.seasoning === ingredient) {
          this.activeIngredient.seasoning = ''
          this.clearActiveByTypeAction(ingredient)
        } else {
          this.activeIngredient.seasoning = ingredient
          this.addActiveByTypeAction(ingredient)
        }
      }
    },
    isMain() {
      return this.category === 'main'
    },
    isSide() {
      return this.category === 'side'
    },
    isSeasoning() {
      return this.category === 'seasoning'
    },
    ...mapActions(['addActiveByTypeAction', 'clearActiveByTypeAction'])
  }
}
</script>
