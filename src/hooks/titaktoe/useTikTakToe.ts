import { Ref, ref } from 'vue';

type MoveType = {
  index: string | number;
  score: number;
};

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
let originBoard: Array<string | number>;

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
    if (currentPlayer.value === aiClass.value) handleAiTurn();
  };
  const resetPlayers = () => {
    playerClass.value = '';
    aiClass.value = '';
    currentPlayer.value = '';
  };

  /*____________________ CELLS LOGIC ______________________________________ */
  const isCellEmpty = (target: Element) =>
    !target.classList.contains('oClass') &&
    !target.classList.contains('xClass');
  const fillCell = (target: Element) => {
    target.classList.add(currentPlayer.value);
    originBoard[parseInt(target.id) - 1] = currentPlayer.value;
  };
  const emptyCells = (board: (string | number)[]) =>
    board.filter((el) => typeof el == 'number');

  const removeClasses = (element: Element) => {
    element.classList.remove('xClass');
    element.classList.remove('oClass');
  };
  const clearCells = () => {
    if (container.value)
      for (let i = 0; i < container.value.children.length; i++) {
        removeClasses(container.value.children[i]);
      }
  };

  /*_________________________GAME LOGIC ______________________________________ */
  const startGame = () => {
    if (playerClass.value) {
      originBoard = Array.from(Array(9).keys());
      handleFirstPlayer();
    } else {
      alert('Please pick X or O before trying to start the game');
    }
  };

  const checkWin = (player: string, board: (string | number)[]) => {
    if (container.value) {
      return WIN_COMBO.some((combo) => {
        return combo.every((index) => {
          return board[index - 1] === player;
        });
      });
    }
  };
  const handleEnd = (content: string) => {
    finishLayoutValue.value = content;
    isGameOver.value = true;
  };
  const checkTie = (board: (string | number)[]) => {
    if (emptyCells(board).length === 0) handleEnd('Tie game');
  };
  const handleWin = (player: string) => {
    const playerString = player === 'xClass' ? 'X player' : 'O player';
    const content = `${playerString} won`;
    handleEnd(content);
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

  const handleTurn = (target: Element, player: string) => {
    fillCell(target);
    if (checkWin(player, originBoard)) handleWin(player);
    checkTie(originBoard);
    switchTurn();
  };

  const minimax = (board: Array<string | number>, player: string) => {
    const availables = emptyCells(board) as Array<number>;

    if (checkWin(playerClass.value, board)) {
      return { score: -10 };
    } else if (checkWin(aiClass.value, board)) {
      return { score: 10 };
    } else if (availables.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availables.length; i++) {
      const move: MoveType = {
        index: '',
        score: NaN,
      };
      move.index = board[availables[i]];
      board[availables[i]] = player;

      if (player === aiClass.value)
        move.score = minimax(board, playerClass.value).score;
      else move.score = minimax(board, aiClass.value).score;
      board[availables[i]] = move.index;
      if (
        (player === aiClass.value && move.score === 10) ||
        (player === playerClass.value && move.score === -10)
      )
        return move;
      else moves.push(move);
    }

    let bestMove = NaN;
    if (player === aiClass.value) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        const currentScore = moves[i].score;
        if (typeof currentScore == 'number' && currentScore > bestScore) {
          bestScore = currentScore;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        const currentScore = moves[i].score;
        if (typeof currentScore == 'number' && currentScore < bestScore) {
          bestScore = currentScore;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };
  const handleAiTurn = () => {
    const bestSpot = (minimax(originBoard, aiClass.value) as MoveType)
      .index as number;
    const rightCell = container.value?.children[bestSpot];
    if (rightCell) handleTurn(rightCell, aiClass.value);
  };
  const handleClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (playerClass.value && currentPlayer.value) {
      if (playerClass.value === currentPlayer.value) {
        if (isCellEmpty(target)) {
          handleTurn(target, playerClass.value);
          setTimeout(() => {
            handleAiTurn();
          }, 450);
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
    currentPlayer,
    finishLayoutValue,
    isGameOver,
    playerClass,
    definePlayers,
    handleClick,
    resetGame,
    startGame,
  };
};
