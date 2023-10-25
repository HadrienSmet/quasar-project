<template lang="">
  <div class="finish-layout">
    <h2>Game finished!</h2>
    <p>{{ content }}</p>
    <q-btn @click="$emit('resetGame')" flat dense>Replay</q-btn>
  </div>
</template>
<script setup lang="ts">
defineProps({
  content: String,
});
</script>
