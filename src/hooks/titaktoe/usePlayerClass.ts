import { ref } from 'vue';

export const usePlayerClass = () => {
  const playerClass = ref('');

  const handlePLayerClass = (dynamicClass: string) => {
    playerClass.value = dynamicClass;
  };

  return { playerClass, handlePLayerClass };
};
