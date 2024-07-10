import { NumPlayer } from "./component/MatBoard";



const resetGame = (setMatBoard: (mat: number[][]) => void, boardSize: number, setCurrentPlayer: (num: NumPlayer) => void) => {
  setMatBoard(initialMat(boardSize));
  setCurrentPlayer(NumPlayer.zero);
};

const randomNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const handleOpen = (setOpen: (value: boolean) => void) => setOpen(true);

const handleClose = (setOpen: (value: boolean) => void) => setOpen(false);

const initialMat = (boardSize: number): number[][] => (
  Array(boardSize)
    .fill(0)
    .map(() => Array(boardSize).fill(0))
);

const hasValueInMatrix = (matBoard:number[][]) => {
  for (let i = 0; i < matBoard.length; i++) {
    for (let j = 0; j < matBoard[i].length; j++) {
      if (matBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};
const hasZeroInMatrix = (matBoard:number[][]) => {
  for (let i = 0; i < matBoard.length; i++) {
    for (let j = 0; j < matBoard[i].length; j++) {
      if (matBoard[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
};

export { resetGame, randomNumberInRange, handleOpen, handleClose,initialMat,hasValueInMatrix,hasZeroInMatrix }


