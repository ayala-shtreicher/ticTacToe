import { Button, FormControl, TextField } from "@mui/material";
import BoardStyle from "./Board.style";
import Swal from "sweetalert2";
import { NumPlayer } from "./MatBoard";
import { initialMat } from "../util";
import { useState } from "react";

type Props = {
    boardSize:number;
    setBoardSize: (num: number) => void;
    setMatBoard: (mat: number[][]) => void;
    setCurrentPlayer: (num: NumPlayer) => void;
}

export default function MyForm({boardSize,setBoardSize,setMatBoard,setCurrentPlayer} : Props) {
    const [inputValue, setInputValue] = useState<number>(boardSize);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(event.target.value);
      if (!(num % 1)) setInputValue(num);
      else Swal.fire({ text: "ניתן לאתחל רק עם מספר שלם", confirmButtonColor: "red" });
      if (num < 3 || num > 15) Swal.fire({ text: "ערך גדול מדי", confirmButtonColor: "red" });
    };
    const initializeBoard = (e: React.FormEvent) => {
        e.preventDefault();
        setBoardSize(inputValue);
        setMatBoard(initialMat(inputValue));
        setCurrentPlayer(NumPlayer.zero)
      };

    return (
        <>
           <FormControl component="form" sx={BoardStyle.form} onSubmit={initializeBoard}>
          <TextField type="number" label="גודל הלוח" variant="outlined" value={inputValue} onChange={handleInputChange} size="small" sx={BoardStyle.textField} />
          <Button variant="contained" color="error" type="submit" sx={BoardStyle.button}> אתחל לוח </Button>
        </FormControl>
        </>
    );
}