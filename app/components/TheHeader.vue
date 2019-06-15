<template>
  <div grid-list-xs>
    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list dense>
        <v-list-tile
          avatar
          style="cursor:pointer;"
          @click.stop="drawer = !drawer"
        >
          <v-list-tile-action>
            <v-icon>dehaze</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-bold"
              >close</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="item in items"
          :key="item.text"
          @click="$router.push(item.href)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      hidden-sm-and-up
      color="blue lighten-4"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title
        justify-center
        align-center
        class="title mr-5 align-center"
      >
        <div @click.stop="$router.push('/')">
          Choose Ingredients
        </div>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'home', title: 'home', text: 'home', href: '/' },
      { icon: 'library_books', text: 'blog', href: '/posts/' },
      { icon: 'local_dining', text: '主菜', href: '/ingredients/main' },
      { icon: 'local_dining', text: '副菜', href: '/ingredients/side' },
      { icon: 'local_dining', text: '調味料', href: '/ingredients/seasoning' }
    ]
  })
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
</style>
