<template>
  <v-layout row wrap>
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-card
            v-if="protein.id || vegetable.id || seasoning.id"
            color="red lighten-4"
          >
            <v-card-text>
              <span v-if="protein.id">
                <v-chip outline color="red">
                  {{ protein.name }}
                  <v-icon right @click="removeProtein">close</v-icon>
                </v-chip>
              </span>
              <span v-if="vegetable.id">
                <v-chip outline color="red">
                  {{ vegetable.name }}
                  <v-icon right @click="removeVegetable">close</v-icon>
                </v-chip>
              </span>
              <span v-if="seasoning.id">
                <v-chip outline color="red">
                  {{ seasoning.name }}
                  <v-icon right @click="removeSeasoning">close</v-icon>
                </v-chip>
              </span>
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
            {{ titles[n - 1] }}
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
    ...mapGetters([
      'ingredients',
      'selectedIngredient',
      'protein',
      'vegetable',
      'seasoning'
    ])
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
    removeProtein() {
      this.clearProteinAction()
    },
    removeVegetable() {
      this.clearVegetableAction()
    },
    removeSeasoning() {
      this.clearSeasoningAction()
    },
    ...mapActions([
      'addSelectedIngredient',
      'clearProteinAction',
      'clearVegetableAction',
      'clearSeasoningAction'
    ])
  }
}
</script>

<style scoped>
.selectedIngredients {
  color: var(--v-primary-base);
  background-color: var(--v-accent-lighten2);
}
</style>
