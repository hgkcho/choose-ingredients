<template>
  <v-layout align-center justify-center row wrap>
    <v-flex sm8>
      <v-container grid-list-xs>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Post List</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>check_circle</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line>
            <template v-for="(source, index) in postList">
              <v-list-tile :key="index" avatar ripple @click="detail(source)">
                <v-list-tile-content>
                  <v-list-tile-title
                    >{{ source.title }} :{{
                      source.createdAt
                    }}</v-list-tile-title
                  >
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import postList from '../../../content/posts/json/_summary.json'

export default {
  asyncData() {
    return {
      postList: postList
    }
  },
  methods: {
    detail(source) {
      this.$router.push(source.href)
    }
  }
}
</script>
