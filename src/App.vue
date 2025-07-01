<template>
  <!-- define o layot a partir das rotas -->
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>

<script>
import { RouterView } from "vue-router";
import { useRouter, useRoute } from 'vue-router'
import LayoutDefault from "./layouts/LayoutDefault.vue";

export default {
  components: {
    LayoutDefault
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
