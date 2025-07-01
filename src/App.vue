<template>
  <!-- define o layot a partir das rotas -->
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>

<script>
import { RouterView } from "vue-router";
import { useRouter, useRoute } from 'vue-router'
import LayoutEmpty from "./layouts/LayoutEmpty.vue";  

export default {
  components: {
    LayoutEmpty
  },
  setup() {
    const route = useRoute()
    console.log(route.meta.layout)

    return {
      route,
      RouterView
    }
  }
}
</script>

<style scoped></style>
