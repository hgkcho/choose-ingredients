<template>
  <v-layout row wrap>
    <v-container>
      <!-- アクティブなingredientを管理 -->
      <v-layout row wrap>
        <v-flex>
          <v-card
            v-if="isMainActive || isSideActive || isSeasoningActive"
            color="red lighten-4"
          >
            <v-card-text>
              <span v-if="isMainActive">
                <v-chip outline color="red">
                  {{ activeIngredients.main.name }}
                  <v-icon right @click="removeMain">close</v-icon>
                </v-chip>
              </span>
              <span v-if="isSideActive">
                <v-chip outline color="red">
                  {{ activeIngredients.side.name }}
                  <v-icon right @click="removeSide">close</v-icon>
                </v-chip>
              </span>
              <span v-if="isSeasoningActive">
                <v-chip outline color="red">
                  {{ activeIngredients.seasoning.name }}
                  <v-icon right @click="removeSeasoning">close</v-icon>
                </v-chip>
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- アクティブなingredientを管理 -->

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
              <ItemCard :title="titles[n - 1]" :category="categories[n - 1]" />
            </v-card>
          </v-tab-item>
        </v-tabs>

        <v-layout row wrap class="text-xs-center mt-3">
          <v-btn color="info" @click="reload">リロード</v-btn>
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
const CATEGORIES = ['main', 'side', 'seasoning']

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
    isMainActive() {
      return this.activeIngredients.main !== null
    },
    isSideActive() {
      return this.activeIngredients.side !== null
    },
    isSeasoningActive() {
      return this.activeIngredients.seasoning !== null
    },
    ...mapGetters([
      'ingredients',
      'activeIngredients',
      'main',
      'side',
      'seasoning'
    ])
  },
  methods: {
    next() {
      const active = parseInt(this.active)
      this.active = active < 2 ? active + 1 : 0
    },
    checkBtn() {
      if (this.active === 2) {
        this.btnText = '確認'
      }
    },
    reload() {
      location.reload()
    },
    removeMain() {
      this.clearActiveByTypeAction('main')
    },
    removeSide() {
      this.clearActiveByTypeAction('side')
    },
    removeSeasoning() {
      this.clearActiveByTypeAction('seasoning')
    },
    ...mapActions(['clearActiveByTypeAction'])
  }
}
</script>

<style scoped>
.selectedIngredients {
  color: var(--v-primary-base);
  background-color: var(--v-accent-lighten2);
}
</style>
