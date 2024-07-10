import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { NumPlayer } from "./MatBoard";
import { handleClose, resetGame } from "../util";
import BoardStyle from './Board.style';


type Props = {
  currentPlayer: NumPlayer;
  winner: string;
  setMatBoard: (mat: number[][]) => void;
  boardSize: number;
  setCurrentPlayer: (num: NumPlayer) => void;
  open:boolean;
  setOpen:(flag:boolean)=>void;
}

export default function ModalWinner({ currentPlayer, winner, setMatBoard, boardSize, setCurrentPlayer,open,setOpen }: Props) {
 
 

  return (
    <>
      <Modal
        open={open}
        onClose={() => { handleClose(setOpen); currentPlayer !== NumPlayer.zero ? resetGame(setMatBoard, boardSize, setCurrentPlayer) : null }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={BoardStyle.modal}>
          <h2>
            😊 {winner} :המנצח הוא
          </h2>
        </Box>
      </Modal>
    </>
  );
}