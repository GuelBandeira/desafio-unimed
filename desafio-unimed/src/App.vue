<script setup>
import Personagens from "@/components/Personagens.vue";
</script>

<template>
  <div id="home">
    <Personagens />
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    Personagens,
  },
};
</script>
