<template>
  <v-container grid-list-xs>
    <v-layout justify-center ma-2 row wrap>
      <v-flex sm8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto">{{ name }}</h1>
          </v-card-title>
          <v-layout row wrap>
            <div class="mx-auto">
              主な栄養素:
              <span v-for="ele in main_nutritions" :key="ele.id">
                {{ ele }}
              </span>
            </div>
          </v-layout>
          <!-- {{ router.go(-1) }} -->
          <v-card-text>
            <!-- eslint-disable vue/no-v-html -->
            <div class="ma-2 markdown-body body-1" v-html="$md.render(body)" />
            <!-- eslint-enable vue/no-v-html -->
          </v-card-text>
        </v-card>
        <v-btn round fixed bottom="16px" color="success" @click="backPage"
          >戻る</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`../../../../../content/ingredients/json/${params.category}/${
        params.slug
      }.json`),
      {
        params
      }
    )
  },
  methods: {
    backPage() {
      window.history.back()
    }
  }
}
</script>
