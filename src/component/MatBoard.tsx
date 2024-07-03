import { useState } from "react";
// import Game from "./Game";
import Board from "./Board";

type Player = {
  num: number;
  shape: string;
};

export default function MatBoard() {
  const [boardSize,setBoardSize] = useState(3);
  const [matBoard, setMatBoard] = useState<number[][]>(Array(boardSize)
  .fill(0)
  .map(() => Array(boardSize).fill(0)))
  const [numPlayer, setNumPlayer] = useState(0);
  const [player1, setPlayer1] = useState<Player>({ num: 0, shape: "" });
  const [player2, setPlayer2] = useState<Player>({ num: 0, shape: "" });

  const props = {
    boardSize,
    setBoardSize,
    matBoard,
    setMatBoard,
    numPlayer,
    setNumPlayer,
    player1,
    setPlayer1,
    player2,
    setPlayer2,
  };

  return (
    <>
      <Board {...props} />
    </>
  );
}
