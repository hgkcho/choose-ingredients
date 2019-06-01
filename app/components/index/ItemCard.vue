<template>
  <v-card>
    <v-layout row wrap align-center justify-center>
      <v-card-title primary-title class="title">
        {{ title }}
      </v-card-title>
    </v-layout>

    <v-layout v-if="isProtein()" row wrap align-center class="text-xs-center">
      <v-flex v-for="ingredient in items" :key="ingredient.id" xs6 align-center>
        <v-hover>
          <v-card
            :class="{ ext: protein.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="addProteinAction(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
                <!-- <div>
                  <AddItemButton :category="category" :item="ingredient" />
                </div> -->
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-layout v-if="isVegetable()" row wrap align-center class="text-xs-center">
      <v-flex v-for="ingredient in items" :key="ingredient.id" xs6 align-center>
        <v-hover>
          <v-card
            :class="{ ext: vegetable.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="addVegetableAction(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
                <!-- <div>
                  <AddItemButton :category="category" :item="ingredient" />
                </div> -->
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-layout v-if="isSeasoning()" row wrap align-center class="text-xs-center">
      <v-flex v-for="ingredient in items" :key="ingredient.id" xs6 align-center>
        <v-hover>
          <v-card
            :class="{ ext: seasoning.name === ingredient.name }"
            class="mx-auto ma-2 text-xs-center"
            @click="addSeasoningAction(ingredient)"
          >
            <v-card-text>
              {{ ingredient.name }}
            </v-card-text>
            <v-card-actions justify-center align-center class="text-xs-center">
              <v-layout column class="text-xs-center">
                <div>
                  <v-btn outline color="info" class="ma-3">詳しく見る</v-btn>
                </div>
                <!-- <div>
                  <AddItemButton :category="category" :item="ingredient" />
                </div> -->
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
    ...mapGetters([
      'protein',
      'vegetable',
      'seasoning',
      'ingredients',
      'selectedIngredient'
    ])
  },
  asyncData() {
    return {
      activeIngredient: {
        protein: '',
        vegetable: '',
        seasoning: ''
      }
    }
  },
  methods: {
    hasSelectedIngredients() {
      return this.selectedIngredient !== []
    },
    // /**
    //  * vuexに保存する
    //  */
    // // addingredient(ingredient) {
    // //   const payload = {
    // //     id: ingredient.id,
    // //     name: ingredient.name
    // //   }
    // //   this.addselectedingredient({ payload })
    // // },
    /**
     * todo
     * 途中
     * 切り替え
     */
    toggleIngredient(ingredient, ingredientType) {
      if (ingredientType === 'protein') {
        if (this.activeIngredient[ingredientType] === '') {
          this.addProteinAction(ingredient)
          this.activeIngredient[ingredientType] = ingredient
        } else {
          this.clearProteinAction()
          this.activeIngredient[ingredient] = ''
        }
      }
      if (ingredientType === 'vegetable') {
        if (this.activeIngredient[ingredientType] === '') {
          this.addVegetableAction(ingredient)
          this.activeIngredient[ingredientType] = ingredient
        } else {
          this.clearVegetableAction()
          this.activeIngredient[ingredient] = ''
        }
      }
      if (ingredientType === 'seasoning') {
        if (this.activeIngredient[ingredientType] === '') {
          this.addSeasoningAction(ingredient)
          this.activeIngredient[ingredientType] = ingredient
        } else {
          this.clearSeasoningAction()
          this.activeIngredient[ingredient] = ''
        }
      }
    },
    isProtein() {
      return this.category === 'protein'
    },
    isVegetable() {
      return this.category === 'vegetable'
    },
    isSeasoning() {
      return this.category === 'seasoning'
    },
    deactivateIngredient(ingredientType) {
      this.activeIngredient[ingredientType] = ''
    },
    ...mapActions([
      'addProteinAction',
      'addVegetableAction',
      'addSeasoningAction',
      'addSelectedIngredient',
      'clearProteinAction',
      'claerVegetableAction',
      'clearSeasoningAction'
    ])
  }
}
</script>

<style scoped>
.ext {
  background: #ffe0b2;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  margin: 10px 0 0 0;
  -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  transform: translateY(-5px);
}
.normal {
  background: white;
}
.active {
  color: aqua;
}
.elevation-12:hover {
  background: #ffdead;
  box-shadow: 0px 3px 5px -1px;
}
</style>
