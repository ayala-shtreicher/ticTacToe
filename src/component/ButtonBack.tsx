import { Button } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { handleClose, hasValueInMatrix, hasZeroInMatrix } from "../util";
import { Dispatch, SetStateAction } from "react";
import { HistoryItem, NumPlayer } from "./MatBoard";
import BoardStyle from "./Board.style";

type Props = {
    currentPlayer: NumPlayer;
    setCurrentPlayer: (num: NumPlayer) => void;
    matBoard: number[][];
    setMatBoard: (mat: number[][]) => void;
    history: HistoryItem[];
    setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
    intervalClick: number;
    setOpenModalLocked: (flag: boolean) => void;
    openModalWinner: boolean
}

export default function ButtonBack({ matBoard, setMatBoard, history, setHistory, setOpenModalLocked, openModalWinner, currentPlayer, setCurrentPlayer }: Props) {


    const stepBack = () => {
        if (history.length > 1) {
            handleClose(setOpenModalLocked)
            currentPlayer === NumPlayer.two ? setCurrentPlayer(NumPlayer.one) : setCurrentPlayer(NumPlayer.two);
            const i = history[history.length - 1].i;
            const j = history[history.length - 1].j;
            setMatBoard([...matBoard.slice(0, i), [...matBoard[i].slice(0, j), 0, ...matBoard[i].slice(j + 1)], ...matBoard.slice(i + 1)]);
            setHistory([...history.slice(0, -1)]);
        }
    };

    return (
        <>
            <Button variant="contained" color="error" disabled={!hasValueInMatrix(matBoard) ||
                !hasZeroInMatrix(matBoard) ||
                openModalWinner}
                onClick={stepBack} className="button-return" sx={BoardStyle.buttonback}><ArrowCircleLeftIcon></ArrowCircleLeftIcon>
                חזור צעד
            </Button>
        </>
    );
}