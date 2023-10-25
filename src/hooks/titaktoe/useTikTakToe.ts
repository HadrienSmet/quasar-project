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
let originBoard;

export const useTikTakToe = () => {
  const container = ref<Ref<HTMLDivElement> | null>(null);
  const isGameOver = ref(false);
  const finishLayoutValue = ref('');
  const playerClass = ref('');
  const aiClass = ref('');
  const currentPlayer = ref('');

  /*____________________ PLAYERS LOGIC __________________________________ */
  const definePlayers = (dynamicClass: string) => {
    playerClass.value = dynamicClass;
    aiClass.value = dynamicClass === 'xClass' ? 'oClass' : 'xClass';
  };
  const handleFirstPlayer = () => {
    const random = Math.random();
    currentPlayer.value = random > 0.5 ? playerClass.value : aiClass.value;
  };
  const resetPlayers = () => {
    playerClass.value = '';
    aiClass.value = '';
    currentPlayer.value = '';
  };

  /*____________________ CELLS LOGIC ______________________________________ */
  const fillCell = (target: HTMLDivElement) => {
    if (
      !target.classList.contains('oClass') &&
      !target.classList.contains('xClass')
    ) {
      target.classList.add(currentPlayer.value);
      originBoard[parseInt(target.id)] = currentPlayer.value;
    }
  };
  const emptyCells = () => {
    if (container.value) {
      const availables: string[] = [];
      for (let i = 0; i < container.value.children.length; i++) {
        const currentChild = container.value.children[i];
        if (
          !currentChild.classList.contains('xClass') &&
          !currentChild.classList.contains('oClass')
        )
          availables.push(currentChild.id);
      }
      return availables;
    }
  };

  const isEmpty = (target: HTMLDivElement) =>
    !target.classList.contains('oClass') &&
    !target.classList.contains('xClass');

  const removeClasses = (element: Element) => {
    element.classList.remove('xClass');
    element.classList.remove('oClass');
  };
  const clearCells = () => {
    if (container.value) {
      for (let i = 0; i < container.value.children.length; i++) {
        const element = container.value.children[i];
        removeClasses(element);
      }
    }
  };

  /*_________________________GAME LOGIC ______________________________________ */
  const startGame = () => {
    originBoard = Array.from(Array(9).keys());
    handleFirstPlayer();
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
  const handleWin = (player: string) => {
    const playerString = player === 'xClass' ? 'X player' : 'O player';
    finishLayoutValue.value = `${playerString} won`;
    isGameOver.value = true;
  };

  const resetGame = () => {
    resetPlayers();
    clearCells();
    isGameOver.value = false;
  };

  /*____________________________ TURN LOGIC ____________________________________ */
  const switchTurn = () => {
    currentPlayer.value =
      currentPlayer.value === playerClass.value
        ? aiClass.value
        : playerClass.value;
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (playerClass.value && currentPlayer.value) {
      if (playerClass.value === currentPlayer.value) {
        if (isEmpty(target)) {
          fillCell(target);
          if (checkWin(playerClass.value)) handleWin(playerClass.value);
          switchTurn();
        }
      } else {
        alert('It is the ai turn');
      }
    } else {
      alert('please pick x or o');
    }
  };

  return {
    container,
    finishLayoutValue,
    isGameOver,
    playerClass,
    definePlayers,
    handleClick,
    resetGame,
  };
};

// export const useCellLogic = (humanPlayer: string, aiPlayer: string) => {
// const handlePLayerClass = (dynamicClass: string) => {
//   playerClass.value = dynamicClass;
//   currentPlayer.value = dynamicClass;
//   aiClass.value = dynamicClass === 'xClass' ? 'oClass' : 'xClass';
// };

// const minimax = (board: number[], isMaximizing: boolean, depth: number) => {
//   if (container.value) {
//     const availables = emptyCells();
//     const children = container.value.children;
//     if (checkWin(playerClass.value)) {
//       return { score: -10 }
//     } else if (checkWin(aiClass.value)) {
//       return { score: 10 };
//     } else if (availables?.length === 0) {
//       return { score: 0 }
//     }
//     if (availables) {
//       let moves = [];
//       for (let i = 0; i < availables.length; i++) {
//         let move = {};
//         move.index = children[parseInt(availables[i])]
//       }
//     }
//   }
// }

// return {
//   container,
//   finishLayoutValue,
//   isGameOver,
//   playerClass,
//   handleClick,
//   handlePLayerClass,
//   resetGame,
// };
// };
