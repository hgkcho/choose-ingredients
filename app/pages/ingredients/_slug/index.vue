<template>
  <v-layout justify-center ma-2 row wrap>
    <v-flex sm-8>
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
        <v-card-text>
          <!-- eslint-disable vue/no-v-html -->
          <div class="ma-2 markdown-body body-1" v-html="$md.render(body)" />
          <!-- eslint-enable vue/no-v-html -->
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`../../../../content/ingredients/json/${params.slug}.json`),
      { params }
    )
  }
}
</script>
