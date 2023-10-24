<template>
  <div class="text-h4 q-mb-lg">Quasar Tik Tak Toe</div>
  <ClassPicker @class-event="handlePLayerClass" :playerClass="playerClass" />
  <div ref="container" class="game-container row wrap justify-center">
    <CellContainer
      @round-event="handleClick"
      v-for="n in 9"
      :key="n"
      :index="n"
    />
  </div>
</template>
<script setup lang="ts">
import { useCellLogic, usePlayerClass } from '../../hooks/titaktoe';

import CellContainer from './CellContainer.vue';
import ClassPicker from './ClassPicker.vue';

const { playerClass, handlePLayerClass } = usePlayerClass();
const { container, handleClick } = useCellLogic(playerClass);
</script>
<style lang=""></style>
