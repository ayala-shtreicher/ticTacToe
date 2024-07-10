import { SxProps } from "@mui/material";


const grid: SxProps = {
  alignItems: "center",
  justifyContent: "center",
}
const title: React.CSSProperties = {
  textAlign: "center",
  marginTop: 50,
  marginLeft: -80
}
const singleBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
}
const item: SxProps = {
  marginTop: 15,
  marginRight:10
}
const button: SxProps = {
 marginRight:-5
}
const form: SxProps = {
display:"inline-block"
}
const textField: SxProps = {
 marginRight:1,
 width: '10ch'
}
const buttonback: SxProps = {
  zIndex: 9999,
  top:140,
  left:"20%"
}
const container: SxProps = {
  color: "red",
  mt: 3.5,
  mr: -1
}
const modal: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '48%',
  transform: 'translate(-50%, -50%)',
  width: "50vh",
  bgcolor: "rgba(0,0,0,0)",
  boxShadow: 24,
  p: 4,
  color:"white",
  fontSize:"2rem",
  textAlign:"center"
}

export default {
  grid, title, singleBox, item, button, textField, buttonback, modal, container,form
}