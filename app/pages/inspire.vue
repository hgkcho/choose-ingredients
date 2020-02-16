<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <v-card xs10>
        <v-container grid-list-lg fluid>
          <v-layout row wrap justify-center>
            <v-flex xs8>
              <v-card color="blue-grey darken-2" class="ma-4 white--text">
                <v-img src="/icon.png" height="200px"> </v-img>
                <v-card-title primary-title>
                  <div>
                    <transition
                      name="custom-classes-transition"
                      enter-active-class="animated tada"
                      leave-active-class="animated bounceOutRight"
                    >
                      <h3 v-if="show">headline</h3>
                    </transition>
                    <v-btn color="success" @click="show = !show">Toggle</v-btn>
                    <div>description</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn color="success" @click="show = !show">Toggle</v-btn>

                  <v-btn flat color="primary white--text">text</v-btn>
                  <v-btn flat color="primary">text</v-btn>
                  <v-btn flat color="primary">text</v-btn>
                </v-card-actions>
              </v-card>

              <v-card color="blue-grey darken-1" class="ma-4 white--text">
                <v-card-title primary-title>
                  <div>
                    <transition
                      name="custom-classes-transition"
                      enter-active-class="animated tada"
                      leave-active-class="animated bounceOutRight"
                    >
                      <h3 v-if="show2">headline</h3>
                    </transition>
                    <div>description</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <input v-model="query" color="primary" />
                  <transition-group
                    class="aaa"
                    name="staggered-fade"
                    tag="ul"
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
                  >
                    <li
                      v-for="(item, index) in computedList"
                      :key="item.msg"
                      :data-index="index"
                    >
                      {{ item.msg }}
                    </li>
                  </transition-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="success" @click="show2 = !show2">Toggle</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import anime from 'animejs'

export default {
  head: {
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js'
      },
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
    computedList() {
      const vm = this
      return this.list.filter(function(item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  asyncData() {
    return {
      show: true,
      show2: true,
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        easing: 'easeInOutSine',
        height: '1.5em',
        delay: function(el, i, l) {
          return i * 150
        },
        endDelay: function(el, i, l) {
          return (l - i) * 150
        }
      })
    },
    leave(el, done) {
      anime({
        targets: el,
        // translateX: '100px',
        easing: 'easeInOutExpo',
        opacity: [1, 0],
        height: '0',
        delay(el, i, l) {
          return i * 300
        }
      })
    }
  }
}
</script>
