<template lang="">
  <div class="class-picker justify-center q-mb-xl">
    <q-btn
      flat
      dense
      round
      :class="playerClass === 'xClass' && 'selected'"
      @click="$emit('classEvent', 'xClass')"
      >X</q-btn
    >
    <q-btn
      flat
      dense
      round
      :class="playerClass === 'oClass' && 'selected'"
      @click="$emit('classEvent', 'oClass')"
      >O</q-btn
    >
  </div>
</template>
<script setup lang="ts">
defineProps({
  playerClass: String,
});
</script>
<style lang=""></style>
