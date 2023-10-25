<template>
  <div class="text-h4 q-mb-lg">Quasar Tik Tak Toe</div>
  <ClassPicker @class-event="definePlayers" :playerClass="playerClass" />
  <div ref="container" class="game-container row wrap justify-center">
    <CellContainer
      @round-event="handleClick"
      v-for="n in 9"
      :key="n"
      :index="n"
    />
  </div>
  <FinishLayout
    v-if="isGameOver"
    :content="finishLayoutValue"
    @reset-game="resetGame"
  />
</template>
<script setup lang="ts">
import { useTikTakToe } from '../../hooks/titaktoe';

import CellContainer from './CellContainer.vue';
import ClassPicker from './ClassPicker.vue';
import FinishLayout from './FinishLayout.vue';

const {
  container,
  finishLayoutValue,
  isGameOver,
  playerClass,
  definePlayers,
  handleClick,
  resetGame,
} = useTikTakToe();
</script>
