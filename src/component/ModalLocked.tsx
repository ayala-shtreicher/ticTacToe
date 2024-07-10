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
                {/* <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    // alt="The house from the offer."
                    src="https://lottie.host/embed/28074572-4b32-49a8-a89e-63dd5fbe5b4e/GU2lY3mOtC.json"
                /> */}

                <Box sx={BoardStyle.modal}>
                    <h2><BackHandIcon></BackHandIcon> אנא המתן </h2>
                    <iframe src="https://lottie.host/embed/28074572-4b32-49a8-a89e-63dd5fbe5b4e/GU2lY3mOtC.json" style={{ background: 'white', width: 200, height: 200 }}></iframe><br />
                </Box>
            </Modal>

        </>
    );
}