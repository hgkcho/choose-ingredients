<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex sm8>
        <v-card>
          <v-text-field v-model="search" prepend-icon="search" />
          <v-card-title primary-title>
            <h2 class="mx-auto">{{ categoryName }}</h2>
          </v-card-title>
          <v-card-text>
            <transition-group
              name="staggerd-fade"
              style="cursor:pointer;"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <v-list-tile
                v-for="(item, idx) in searchList"
                :key="item.name"
                :data-index="idx"
                style="border:1px solid pink;border-radius:8px;margin:3px;"
              >
                <v-list-tile-content>
                  <v-list-tile-title @click="detail(item)">{{
                    item.name
                  }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </transition-group>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { setTimeout } from 'timers'
import { mapGetters } from 'vuex'
import anime from 'animejs'

const CATEGORIES = { main: '主菜', side: '副菜', seasoning: '調味料' }

export default {
  head: {
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1'
      }
    ]
  },
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
    searchList() {
      const vm = this
      return this.ingredientList.filter(function(item) {
        return item.name.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
      })
    },
    ...mapGetters(['ingredients', 'main', 'side', 'seasoning'])
  },
  asyncData({ params }) {
    return {
      ingredientData: [],
      category: `${params.category}`,
      categoryName: CATEGORIES[`${params.category}`],
      search: ''
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
    },

    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        easing: 'easeInOutSine',
        height: '3.5em',
        delay(el, i, l) {
          return i * 300
        }
      })
    },
    leave(el, done) {
      let styleTime = 0
      anime({
        targets: [el.children, el],
        epacity: [1, 0],
        easing: 'easeInOutExpo',
        height: '0',
        delay(el, i, l) {
          styleTime += i * 300
          return i * 300
        }
      })
      setTimeout(function() {
        el.style.border = 'none'
      }, styleTime)
    }
  }
}
</script>

<style></style>
