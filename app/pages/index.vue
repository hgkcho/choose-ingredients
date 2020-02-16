<template>
  <v-layout row wrap>
    <v-container>
      <!-- アクティブなingredientを管理 -->
      <v-alert v-model="isAlert" type="error" dismissible
        >アイテムがそれぞれ１つずつ選択されていません</v-alert
      >
      <v-layout row wrap>
        <v-flex>
          <v-card
            v-if="isMainActive || isSideActive || isSeasoningActive"
            color="red lighten-4"
          >
            <v-card-text>
              <span v-if="isMainActive">
                <v-chip small outline color="red">
                  {{ activeIngredients.main.name }}
                  <v-icon right @click="removeMain">close</v-icon>
                </v-chip>
              </span>
              <span v-if="isSideActive">
                <v-chip small outline color="red">
                  {{ activeIngredients.side.name }}
                  <v-icon right @click="removeSide">close</v-icon>
                </v-chip>
              </span>
              <span v-if="isSeasoningActive">
                <v-chip small outline color="red">
                  {{ activeIngredients.seasoning.name }}
                  <v-icon right @click="removeSeasoning">close</v-icon>
                </v-chip>
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- タブで食材軍の種類を分けるところ -->
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

        <!-- 下のボダン軍 -->
        <v-layout row wrap class="text-xs-center mt-3">
          <v-btn round large fixed bottom="16px" color="#f6ffb2" @click="reload"
            >リセット</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="isAllCategoryActive"
            round
            large
            fixed
            right="24px"
            bottom="24px"
            color="success"
            @click="toResult"
            >確認画面へ</v-btn
          >
          <v-btn
            v-else
            round
            large
            fixed
            right="24px"
            bottom="24px"
            color="primary"
            @click="next"
            >次へ</v-btn
          >
        </v-layout>
      </div>
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
      btnText: '次へ',
      isAlert: false
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
    isAllCategoryActive() {
      return this.isMainActive && this.isSideActive && this.isSeasoningActive
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
    toResult() {
      if (this.isAllCategoryActive) {
        this.$router.push('/result')
      } else {
        this.isAlert = true
      }
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
