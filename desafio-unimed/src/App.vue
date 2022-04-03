<script setup>
import Personagens from "@/components/Personagens.vue";
</script>

<template>
  <div id="tela-inicio">
    <Personagens />
  </div>
</template>

<script>
export default {
  name: "tela-inicio",
  components: {
    Personagens,
  },
};
</script>
