import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QR from "../../Assets/payQR.jpeg"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal(props) {
  const [qr, setQr] = React.useState(false);
  // const handleOpen = () => props.setOpen(true);
  const handleClose = (event, reason) => {
    if(reason!=="backdropClick")props.setOpen(false);
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Payment Options
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1. <b>UPI</b> : 123456789@xyz
          </Typography>
          <Typography id="modal-modal-description" style={{cursor:"pointer"}} sx={{ mt: 2 }} onClick={()=>{setQr(prev=>!prev)}}>
            2. <b>QR Code</b><ArrowDropDownIcon style={!qr?{marginTop:"-5px"}:{marginTop:"-5px",transform:"rotate(180deg)"}}/>
            
          </Typography>
          <br/>
          {qr&&<img src={QR} alt="QR" style={{width:"220px"}}/>}
          <Typography id="modal-modal-description" className="d-flex align-items-center justify-content-between modalBtns" sx={{ mt: 2 }}>
            <button className='sec-btn' onClick={handleClose}>Cancel</button>
            <button className='prim-btn' onClick={()=>{
              props.setPaySuccess(true)
              handleClose();
            }}>Done</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}