<template>
  <v-layout ma-2 row wrap justify-center>
    <v-flex sm8>
      <v-card>
        <v-card-title primary-title>
          <h1 class="headline mx-auto">{{ title }}</h1>
        </v-card-title>
        <v-card-text>
          <div class="post-meta">
            <time>{{ params.date }}</time>
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <div class="ma-2 markdown-body body-1" v-html="$md.render(body)" />
          <!-- eslint-enable vue/no-v-html -->
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    compileMarkdown: function() {
      return this.markdownIt.render(this.body)
    }
  },
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`../../../../../content/posts/json/${params.date}-${
        params.slug
      }.json`),
      { params }
    )
  }
}
</script>

<style scoped>
@import 'assets/css/tomorrow-night-bright.css';
@import 'assets/css/md-container.css';
</style>
