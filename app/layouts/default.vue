<template>
  <v-app id="inspire">
    <TheHeader />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style scoped>
#inspire {
  background: #5c5e68;
}
</style>
