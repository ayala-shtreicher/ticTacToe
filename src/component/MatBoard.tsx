import { useState } from "react";
import Board from "./Board";
import ModalWinner from "./ModalWinner";
import { initialMat } from "../util";
import ModalLocked from "./ModalLocked";

export enum ShapePlayer {
  x = "X",
  o = "O",
  empty = ""
}
export enum NumPlayer {
  one = 1,
  two = 2,
  zero = 0
}

export type HistoryItem = {
  i: number;
  j: number;
}

type Player = {
  num: NumPlayer;
  shape: ShapePlayer;
};


export default function MatBoard() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [matBoard, setMatBoard] = useState<number[][]>(initialMat(boardSize));
  const [currentPlayer, setCurrentPlayer] = useState<number>(NumPlayer.zero);
  const [player1, setPlayer1] = useState<Player>({ num: NumPlayer.zero, shape: ShapePlayer.empty });
  const [player2, setPlayer2] = useState<Player>({ num: NumPlayer.zero, shape: ShapePlayer.empty });
  const [winner, setWinner] = useState<string>("");
  const [openModalWinner, setOpenModalWinner] = useState<boolean>(false);
  const [openModalLocked, setOpenModalLocked] = useState<boolean>(false);


  const props = {
    NumPlayer,
    ShapePlayer,
    boardSize,
    setBoardSize,
    matBoard,
    setMatBoard,
    currentPlayer,
    setCurrentPlayer,
    player1,
    setPlayer1,
    player2,
    setPlayer2,
    setWinner,
    openModalWinner,
    setOpenModalWinner,
    setOpenModalLocked,
    openModalLocked
  };

  return (
    <>
      <Board {...props} />
      <ModalWinner currentPlayer={currentPlayer} winner={winner} setMatBoard={setMatBoard} boardSize={boardSize} setCurrentPlayer={setCurrentPlayer} open={openModalWinner} setOpen={setOpenModalWinner} />
      <ModalLocked open={openModalLocked} />
    </>
  );
}
