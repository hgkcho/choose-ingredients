<template>
  <v-layout row wrap>
    <v-container>
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

      <div>
        <v-tabs
          v-model="active"
          active-class
          color="cyan"
          dark
          slider-color="yellow"
        >
          <v-tab v-for="n in 3" :key="n" ripple>
            {{ categories[n - 1] }}
          </v-tab>
          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <ItemCard
                :title="titles[n - 1]"
                :category="categories[n - 1]"
                :items="ingredients"
              />
            </v-card>
          </v-tab-item>
        </v-tabs>

        <v-layout row wrap class="text-xs-center mt-3">
          <v-spacer></v-spacer>
          <v-btn
            v-if="active === 2"
            large
            outline
            round
            color="success"
            @click="next"
            >確認</v-btn
          >
          <v-btn v-else large outline round color="primary" @click="next"
            >次へ</v-btn
          >
        </v-layout>
      </div>

      <v-layout row wrap> </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemCard from '~/components/index/ItemCard'

const TITLES = ['主菜', '副菜', '調味料']
const CATEGORIES = ['protein', 'vegetable', 'seasoning']

export default {
  components: {
    ItemCard
  },
  data() {
    return {
      titles: TITLES,
      categories: CATEGORIES,
      active: 0,
      btnText: '次へ'
    }
  },
  computed: {
    check() {
      if (this.active === 2) {
        return '確認'
      } else {
        return '次へ'
      }
    },
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
    next() {
      const active = parseInt(this.active)
      this.active = active < 2 ? active + 1 : 0
    },
    checkBtn() {
      if (this.active === 2) {
        this.btnText = '確認'
      }
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
