import { Ref, ref } from 'vue';

const WIN_COMBO = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const useCellLogic = (playerClass: Ref<string>) => {
  const container = ref<Ref<HTMLDivElement> | null>(null);

  const fillCell = (target: HTMLDivElement) => {
    if (
      !target.classList.contains('oClass') &&
      !target.classList.contains('xClass')
    ) {
      target.classList.add(playerClass.value);
    }
  };
  const checkWin = (player: string) => {
    if (container.value) {
      return WIN_COMBO.some((combo) => {
        return combo.every((index) => {
          return container.value?.children[index - 1].classList.contains(
            player
          );
        });
      });
    }
  };
  const switchTurn = () => {
    playerClass.value = playerClass.value === 'oClass' ? 'xClass' : 'oClass';
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (playerClass.value !== '') {
      if (
        !target.classList.contains('oClass') &&
        !target.classList.contains('xClass')
      ) {
        fillCell(target);
        if (checkWin(playerClass.value)) {
          console.log(playerClass.value + ' you rock!');
        }
        switchTurn();
      }
    } else {
      alert('please pick x or o');
    }
  };

  return { container, handleClick };
};
