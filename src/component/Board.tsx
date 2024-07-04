import { Box, Button, Container, Grid, TextField, css, styled } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from 'clsx';
import { Modal as BaseModal } from '@mui/base/Modal';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import BackHandIcon from '@mui/icons-material/BackHand';
import XIcon from '@mui/icons-material/X';
import CircleIcon from '@mui/icons-material/Circle';
import '../App.css'
import Swal from "sweetalert2";

type Props = {
  boardSize: number;
  setBoardSize: (num: number) => void,
  matBoard: number[][];
  setMatBoard: (mat: number[][]) => void;
  numPlayer: number;
  setNumPlayer: (num: number) => void;
  player1: { num: number; shape: string };
  setPlayer1: Dispatch<SetStateAction<{ num: number; shape: string }>>;
  player2: { num: number; shape: string };
  setPlayer2: Dispatch<SetStateAction<{ num: number; shape: string }>>;
};

type HistoryItem = {
  i: number;
  j: number;
}

function Board({
  boardSize,
  setBoardSize,
  matBoard,
  setMatBoard,
  numPlayer,
  setNumPlayer,
  player1,
  setPlayer1,
  setPlayer2,
  player2,
}: Props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [history, setHistory] = useState<HistoryItem[]>([{ i: 0, j: 0 }])
  const [disableBack, setDisableBack] = useState(true)
  const [isLocked, setIsLocked] = useState(false);
  const [clickBack, setClickBack] = useState(false);
  const [inputValue, setInputValue] = useState(boardSize);
  const [turn, setTurn] = useState("");
  const [winner, setWinner] = useState("");
  const [intervalClick, setIntervalClick] = useState(-1);
  let flagPlayer2 = false;

// Function to draw a number in a known range
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to check if there is a winner and if there is then who is it
  const checkWinner = (matrix: number[][], n: number) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    // Function to check vertical sequences
    const checkVertical = () => {
      for (let col = 0; col < cols; col++) {
        let count = 1;
        for (let row = 1; row < rows; row++) {
          if (
            matrix[row][col] === matrix[row - 1][col] &&
            matrix[row][col] !== 0
          ) {
            count++;
            if (count === n) {
              if (matrix[row][col] === 1) setWinner(player1.shape);
              else setWinner(player2.shape);
              return true;
            }
          } else {
            count = 1;
          }
        }
      }
      return false;
    };

    // Function to check horizontal sequences
    const checkHorizontal = () => {
      for (let row = 0; row < rows; row++) {
        let count = 1;
        for (let col = 1; col < cols; col++) {
          if (
            matrix[row][col] === matrix[row][col - 1] &&
            matrix[row][col] !== 0
          ) {
            count++;
            if (count === n) {
              if (matrix[row][col] === 1) setWinner(player1.shape);
              else setWinner(player2.shape);
              return true;
            }
          } else {
            count = 1;
          }
        }
      }
      return false;
    };

    // Function to check diagonal sequences from top-left to bottom-right
    const checkDiagonalTopLeftToBottomRight = () => {
      for (let startRow = 0; startRow <= rows - n; startRow++) {
        for (let startCol = 0; startCol <= cols - n; startCol++) {
          let count = 1;
          for (let i = 1; i < n; i++) {
            if (
              matrix[startRow + i][startCol + i] ===
              matrix[startRow + i - 1][startCol + i - 1] &&
              matrix[startRow + i][startCol + i] !== 0
            ) {
              count++;
              if (count === n) {
                if (matrix[startRow + i][startCol + i] === 1)
                  setWinner(player1.shape);
                else setWinner(player2.shape);
                return true;
              }
            } else {
              break;
            }
          }
        }
      }
      return false;
    };

    // Function to check diagonal sequences from top-right to bottom-left
    const checkDiagonalTopRightToBottomLeft = () => {
      for (let startRow = 0; startRow <= rows - n; startRow++) {
        for (let startCol = cols - 1; startCol >= n - 1; startCol--) {
          let count = 1;
          for (let i = 1; i < n; i++) {
            if (
              matrix[startRow + i][startCol - i] ===
              matrix[startRow + i - 1][startCol - i + 1] &&
              matrix[startRow + i][startCol - i] !== 0
            ) {
              count++;
              if (count === n) {
                if (matrix[startRow + i][startCol - i] === 1)
                  setWinner(player1.shape);
                else setWinner(player2.shape);
                return true;
              }
            } else {
              break;
            }
          }
        }
      }
      return false;
    };

    return (
      checkVertical() ||
      checkHorizontal() ||
      checkDiagonalTopLeftToBottomRight() ||
      checkDiagonalTopRightToBottomLeft()
    );
  };

  // Function for a single button and works according to the player accordingly
  const clickBox = (id: number) => {
    if (numPlayer == 2) {
      do {
        const randomNumber = randomNumberInRange(1, boardSize * boardSize);
        if (
          !matBoard[Math.floor((randomNumber - 1) / boardSize)][
          (randomNumber - 1) % boardSize
          ]
        ) {
          setPlayer2({ ...player2, num: randomNumber });
          flagPlayer2 = true;
        }
      } while (!flagPlayer2);
    } else {
      setPlayer1({ ...player1, num: id });
    }
  };
// Function to player1 action
  useEffect(() => {
    if (player1.num !== 0) {
      let i = Math.floor((player1.num - 1) / boardSize);
      let j = (player1.num - 1) % boardSize;
      if (!matBoard[i][j]) {
        const updatedMatrix = [...matBoard];
        updatedMatrix[i][j] = 1;
        setMatBoard(updatedMatrix);
        setDisableBack(false);
        setNumPlayer(2);
        const newHistory = history;
        newHistory?.push({ i, j })
        setHistory(newHistory)
        setClickBack(false);
      }
      else {
        Swal.fire({
          icon: "error",
          title: "...אופס",
          text: "המשבצת כבר תפוסה  - אנא תלחץ על משבצת שאינה מלאה",
          confirmButtonColor: "red"
        })
      }

    }
  }, [player1.num]);

  // Function to player2 action
  useEffect(() => {
    if (player2.num !== 0) {
      let i = Math.floor((player2.num - 1) / boardSize);
      let j = (player2.num - 1) % boardSize;
      if (!matBoard[i][j]) {
        const updatedMatrix = [...matBoard];
        updatedMatrix[i][j] = 2;
        setMatBoard(updatedMatrix);
        setNumPlayer(1);
        const newHistory = history;
        newHistory?.push({ i, j })
        setHistory(newHistory)
        setClickBack(false);
      }
    }
  }, [player2.num]);

  // Function to check who the player is now and what the state of the game is
  useEffect(() => {
    if (numPlayer === 0 && !hasValueInMatrix()) {
      const firstPlayer = randomNumberInRange(1, 2);
      setNumPlayer(firstPlayer);
      if (firstPlayer == 1) {
        setPlayer1({ ...player1, shape: "X" });
        setPlayer2({ ...player2, shape: "O" });
      } else {
        setPlayer2({ ...player2, shape: "X" });
        setPlayer1({ ...player1, shape: "O" });
      }
    }
    if (checkWinner(matBoard, boardSize)) {
      handleOpen();
      setDisableBack(true);
    } else if (!hasZeroInMatrix()) {
      Swal.fire({ text: "תיקו", confirmButtonColor: "red" }).then(result => {
        if (result.isConfirmed) {
          resetGame();
          setDisableBack(true)
        }
      })
    }
    else {
      if (numPlayer == 2 && !checkWinner(matBoard, boardSize)) {
        setIsLocked(true);
        const interval = setTimeout(() => {
          clickBox(0);
          setIsLocked(false);
        }, 5000);
        setIntervalClick(interval)
        setTurn("עכשיו תור השחקן השני");
      } else setTurn("עכשיו תורך");
      return () => {
        clearInterval(intervalClick);
      };
    }

  }, [numPlayer]);

  useEffect(() => {
    setIsLocked(false);
    clearInterval(intervalClick);
  }, [clickBack])

  useEffect(() => {
    if (!open && numPlayer)
      resetGame();
  }, [open])

  const hasZeroInMatrix = () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (matBoard[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  };
  const hasValueInMatrix = () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (matBoard[i][j]) {
          return true;
        }
      }
    }
    return false;
  };

  const resetGame = () => {
    setMatBoard(
      Array(boardSize)
        .fill(0)
        .map(() => Array(boardSize).fill(0))
    );
    setNumPlayer(0);
  };
  // Function to update the game after clicking the step-back button
  const stepBack = () => {
    if (history.length > 1) {
      let i = history[history.length - 1].i;
      let j = history[history.length - 1].j;
      const updatedMatrix = [...matBoard];
      updatedMatrix[i][j] = 0;
      updatedMatrix[history[history.length - 2].i][history[history.length - 2].j] = 0;
      setMatBoard(updatedMatrix);
      const updatedHistory = history.slice(0, -2);
      setHistory(updatedHistory);
      setClickBack(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    if (!(num % 1))
      setInputValue(num);
    else
      Swal.fire({ text: "ניתן לאתחל רק עם מספר שלם", confirmButtonColor: "red" });
  };

  const initializeBoard = () => {
    setBoardSize(inputValue);
    setMatBoard(Array(inputValue).fill(0).map(() => Array(inputValue).fill(0)));
  };

  const buttonStepBack = () => {
    return <Button variant="contained" color="error" disabled={disableBack} onClick={stepBack} className="button-return"><ArrowCircleLeftIcon></ArrowCircleLeftIcon>חזור צעד</Button>
  };
  
  const createBoard = () => {
    let index = 0;
    const arrBoxes = [];
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++, index++) {
        arrBoxes.push(
          <Box className="single-box"
            key={index}
            onClick={(
              (id) => () =>
                clickBox(id + 1)
            )(index)}
            sx={{
              border: "2px solid grey",
              height: 100,
              width: 100
            }}
          >
            <Container sx={{ color: "red", mt: 3.5, mr: -1 }}>
              {matBoard[Math.floor(index / boardSize)][index % boardSize] == 0
                ? ""
                : matBoard[Math.floor(index / boardSize)][index % boardSize] == 1 && player1.shape == "X"
                  ? <XIcon fontSize="large"></XIcon>
                  : matBoard[Math.floor(index / boardSize)][index % boardSize] == 2 && player2.shape == "X"
                    ? <XIcon fontSize="large"></XIcon> : <CircleIcon fontSize="large"></CircleIcon>
              }
            </Container>
          </Box>
        );
      }
    }
    return arrBoxes;
  };

  return (
    <>
      <Grid className="grid"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {isLocked && (
          <div className="screen-lock">
            <div className="screen-lock-message">
              <h2><BackHandIcon></BackHandIcon> אנא המתן </h2>
              <iframe src="https://lottie.host/embed/28074572-4b32-49a8-a89e-63dd5fbe5b4e/GU2lY3mOtC.json" style={{ background: 'white', width: 200, height: 200 }}></iframe><br />
              {buttonStepBack()}
            </div>
          </div>
        )}
        <h1
          style={{ textAlign: "center", marginTop: 50, marginLeft: -80 }}
        >{turn}</h1>
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: (boardSize + 1) * 100

            }}
          >
            {createBoard()}
          </Box>
        </Grid>
        <Grid item xs={3} className="grid" sx={{ mr: 2 }}>
          <Button variant="contained" color="error" onClick={resetGame} sx={{ m: 5 }}>התחל מחדש</Button>
          {buttonStepBack()}<br />
          <TextField type="number" id="outlined-basic" label="גודל הלוח" variant="outlined" value={inputValue} onChange={handleInputChange} size="small" sx={{ mr: 1 }} />
          <Button variant="contained" color="error" onClick={initializeBoard} sx={{ mr: 10, mt: 0.2 }}>אתחל לוח</Button><br />
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            😊 {winner} :המנצח הוא
          </h2>
        </ModalContent>
      </Modal>
    </>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
        position: fixed;
        z-index: 1300;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        `;

const StyledBackdrop = styled(Backdrop)`
        z-index: -1;
        position: fixed;
        inset: 0;
        background-color: rgb(0 0 0 / 0.5);
        -webkit-tap-highlight-color: transparent;
        `;

const ModalContent = styled('div')(
  ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        & .modal-title {
          margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
    }

        & .modal-description {
          margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
    }
        `,
);

export default Board;
