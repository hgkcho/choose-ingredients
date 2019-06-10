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
            :class="{ ext: isActiveIngredient(ingredient) }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div class="d-block">
                  <v-btn
                    outline
                    color="info"
                    class="ma-3"
                    @click="detail(ingredient)"
                    >詳しく見る</v-btn
                  >
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
            :class="{ ext: isActiveIngredient(ingredient) }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div class="d-block">
                  <v-btn
                    outline
                    color="info"
                    class="d-block ma-3"
                    elevation-12
                    @click="detail(ingredient)"
                    >詳しく見る</v-btn
                  >
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
            :class="{ ext: isActiveIngredient(ingredient) }"
            class="mx-auto ma-2 text-xs-center"
            @click="toggleIngredient(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div class="d-block">
                  <v-btn
                    outline
                    color="info"
                    class="ma-3"
                    @click="detail(ingredient)"
                    >詳しく見る</v-btn
                  >
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
  // data() {
  //   return {
  //     activeIngredient: {
  //       main: '',
  //       side: '',
  //       seasoning: ''
  //     }
  //   }
  // },
  computed: {
    ...mapGetters([
      'main',
      'side',
      'seasoning',
      'ingredients',
      'activeIngredients'
    ])
  },
  methods: {
    detail(ingredient) {
      this.$router.push(ingredient.href)
    },
    /**
     * 当該のingredientがアクティブかどうか
     * @param {Object} ingredient
     * @returns {boolean}
     */
    isActiveIngredient(ingredient) {
      const main = this.activeIngredients.main === ingredient
      const side = this.activeIngredients.side === ingredient
      const seasoning = this.activeIngredients.seasoning === ingredient
      if (main || side || seasoning) {
        return true
      } else {
        return false
      }
    },
    /**
     * activeなingredientを切り替える
     * @param {Array} ingredient
     */
    toggleIngredient(ingredient) {
      if (ingredient.category === 'main') {
        if (this.activeIngredients.main === ingredient) {
          this.clearActiveByTypeAction('main')
        } else {
          this.addActiveByTypeAction(ingredient)
        }
      }
      if (ingredient.category === 'side') {
        if (this.activeIngredients.side === ingredient) {
          this.clearActiveByTypeAction('side')
        } else {
          this.addActiveByTypeAction(ingredient)
        }
      }
      if (ingredient.category === 'seasoning') {
        if (this.activeIngredients.seasoning === ingredient) {
          this.clearActiveByTypeAction('seasoning')
        } else {
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
