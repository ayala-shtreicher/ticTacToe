import { Box, Button, Grid } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ShapePlayer, NumPlayer, HistoryItem } from "./MatBoard";
import { handleClose, handleOpen, hasValueInMatrix, hasZeroInMatrix, randomNumberInRange, resetGame } from "../util";
import ButtonBack from "./ButtonBack";
import InitializeBoard from "./InitializeBoard";
import BoardStyle from "./Board.style";
import MyForm from "./MyForm";

type Props = {
  boardSize: number;
  setBoardSize: (num: number) => void;
  matBoard: number[][];
  setMatBoard: (mat: number[][]) => void;
  currentPlayer: NumPlayer;
  setCurrentPlayer: (num: NumPlayer) => void;
  player1: { num: NumPlayer; shape: ShapePlayer };
  setPlayer1: Dispatch<SetStateAction<{ num: NumPlayer; shape: ShapePlayer }>>;
  player2: { num: NumPlayer; shape: ShapePlayer };
  setPlayer2: Dispatch<SetStateAction<{ num: NumPlayer; shape: ShapePlayer }>>;
  setWinner: Dispatch<SetStateAction<string>>;
  openModalWinner: boolean;
  openModalLocked: boolean;
  setOpenModalWinner: (flag: boolean) => void;
  setOpenModalLocked: (flag: boolean) => void;
};
export default function Board({ boardSize, setBoardSize, matBoard, setMatBoard, currentPlayer, setCurrentPlayer, player1, setPlayer1, setPlayer2, player2, setWinner, openModalWinner, openModalLocked, setOpenModalWinner, setOpenModalLocked }: Props) {
  let intervalClick = -1;
  const checkWinner = () => {
    const checkLine = (startRow: number, endRow: number, startCol: number, endCol: number, direction: number[]) => {
      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          let count = 1;
          let currentValue = matBoard[row][col];
          if (currentValue === 0) continue;
          for (let i = 1; i < boardSize; i++) {
            let nextRow = row + i * direction[0];
            let nextCol = col + i * direction[1];
            if (nextRow < 0 || nextRow >= boardSize || nextCol < 0 || nextCol >= boardSize || matBoard[nextRow][nextCol] !== currentValue) {
              break;
            }
            count++;
            if (count === boardSize) {
              if (currentValue === 1) setWinner(player1.shape);
              else setWinner(player2.shape);
              return true;
            }
          }
        }
      }
      return false;
    };
    if (checkLine(0, boardSize, 0, boardSize - 1, [0, 1]) ||
      checkLine(0, boardSize - 1, 0, boardSize, [1, 0]) ||
      checkLine(0, boardSize - 1, 0, boardSize - 1, [1, 1]) ||
      checkLine(boardSize - 1, 0, 0, boardSize - 1, [-1, 1])) { handleOpen(setOpenModalWinner); return true; }
    return false;
  };
  const [history, setHistory] = useState<HistoryItem[]>([{ i: 0, j: 0 }])
  const movePlayer = (num: number) => {
    let i = Math.floor((num - 1) / boardSize);
    let j = (num - 1) % boardSize;
    if (!matBoard[i][j]) {
      if (currentPlayer === NumPlayer.two) {
        setMatBoard([...matBoard.slice(0, i), [...matBoard[i].slice(0, j), 2, ...matBoard[i].slice(j + 1)], ...matBoard.slice(i + 1)]);
        setCurrentPlayer(NumPlayer.one);
      }
      else {
        setMatBoard([...matBoard.slice(0, i), [...matBoard[i].slice(0, j), 1, ...matBoard[i].slice(j + 1)], ...matBoard.slice(i + 1)]);
        setCurrentPlayer(NumPlayer.two);
      }
      setHistory([...history, { i, j }])
    }
    else Swal.fire({ icon: "error", title: "...אופס", text: "המשבצת כבר תפוסה  - אנא תלחץ על משבצת שאינה מלאה", confirmButtonColor: "red" })
  }
  useEffect(() => {
    if (player1.num !== NumPlayer.zero) movePlayer(player1.num)
  }, [player1.num]);
  useEffect(() => {
    if (player2.num !== NumPlayer.zero) movePlayer(player2.num);
  }, [player2.num]);
  const startGame = () => {
    if (currentPlayer === NumPlayer.zero && !hasValueInMatrix(matBoard)) {
      const firstPlayer = randomNumberInRange(1, 2);
      if (firstPlayer == 1) {
        setCurrentPlayer(NumPlayer.one);
        setPlayer1({ ...player1, shape: ShapePlayer.x });
        setPlayer2({ ...player2, shape: ShapePlayer.o });
      } else {
        setCurrentPlayer(NumPlayer.two);
        setPlayer2({ ...player2, shape: ShapePlayer.x });
        setPlayer1({ ...player1, shape: ShapePlayer.o });
      }
    }
  }
  const tie = () => {
    Swal.fire({ text: "תיקו", confirmButtonColor: "red" }).then(result => {
      if (result.isConfirmed) resetGame(setMatBoard, boardSize, setCurrentPlayer);
    })
  }
  const [turnMessage, setTurnMessage] = useState<string>("");
  const computerTurn = () => {
    setTurnMessage("עכשיו תור השחקן השני");
    handleOpen(setOpenModalLocked)
    intervalClick = setTimeout(() => {
      const arrayOfFree = [];
      for (let i = 0; i < matBoard.length; i++)
        for (let j = 0; j < matBoard[i].length; j++)
          if (!matBoard[i][j]) arrayOfFree.push(i * boardSize + j + 1);
      const randomNumber = randomNumberInRange(0, arrayOfFree.length - 1);
      setPlayer2({ ...player2, num: arrayOfFree[randomNumber] });
      handleClose(setOpenModalLocked)
    }, 3000);
  }
  useEffect(() => {
    startGame();
    if (!checkWinner())
      if (!hasZeroInMatrix(matBoard)) tie()
      else if (currentPlayer === NumPlayer.two && !openModalLocked) computerTurn();
      else setTurnMessage("עכשיו תורך")
    return () => { clearInterval(intervalClick) };
  }, [currentPlayer]);
  return (
    <Grid container spacing={0} sx={BoardStyle.grid} direction="column">
      <h1 style={BoardStyle.title}>{turnMessage}</h1>
      <Grid item xs={3}>
        <Box sx={BoardStyle.singleBox} maxWidth={(boardSize * 10) + 10 + "vh"}>
          <InitializeBoard matBoard={matBoard} boardSize={boardSize} player1={player1} setPlayer1={setPlayer1} player2={player2} />
        </Box>
      </Grid>
      <Grid item xs={3} sx={BoardStyle.item}>
        <Button variant="contained" color="error" onClick={() => resetGame(setMatBoard, boardSize, setCurrentPlayer)} sx={BoardStyle.button}>התחל מחדש</Button>
        <ButtonBack history={history} setHistory={setHistory} matBoard={matBoard} setMatBoard={setMatBoard} intervalClick={intervalClick} setOpenModalLocked={setOpenModalLocked} openModalWinner={openModalWinner} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />
        <MyForm boardSize={boardSize} setBoardSize={setBoardSize} setMatBoard={setMatBoard} setCurrentPlayer={setCurrentPlayer} />
      </Grid>
    </Grid>
  )
}