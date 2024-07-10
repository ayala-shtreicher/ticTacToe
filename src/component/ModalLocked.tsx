import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import BackHandIcon from '@mui/icons-material/BackHand';
import BoardStyle from './Board.style';

type Props = {
    open: boolean;
}

export default function ModalLocked({ open }: Props) {

    return (
        <>
            <Modal
                open={open}
                onClose={() => { open }}
            >
                <Box sx={BoardStyle.modal}>
                    <h2><BackHandIcon></BackHandIcon> אנא המתן </h2>
                    <Box
                        component="img"
                        src="/Animation.gif"
                    />
                </Box>
            </Modal>

        </>
    );
}