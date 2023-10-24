<template lang="">
  <div
    :id="index"
    :class="`cell justify-center items-center`"
    @click="(e) => $emit('roundEvent', e)"
  ></div>
</template>
<script setup lang="ts">
defineProps({
  index: Number,
  dynamicClass: String,
});
</script>
