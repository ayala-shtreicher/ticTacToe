import XIcon from '@mui/icons-material/X';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Container } from '@mui/material';
import { NumPlayer, ShapePlayer } from './MatBoard';
import { Dispatch, SetStateAction } from 'react';
import BoardStyle from './Board.style';

type Props = {
    matBoard: number[][];
    boardSize: number;
    player1: { num: NumPlayer; shape: ShapePlayer };
    setPlayer1: Dispatch<SetStateAction<{ num: NumPlayer; shape: ShapePlayer }>>;
    player2: { num: NumPlayer; shape: ShapePlayer };
}

export default function InitializeBoard({matBoard,boardSize,player1,setPlayer1,player2}:Props) {

    let index = 0;

    const clickBox = (id: number) => {
          setPlayer1({ ...player1, num: id });
      };


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
            <Container sx={BoardStyle.container}>
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

}