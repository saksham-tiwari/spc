import React from 'react'
import QRCode from "react-qr-code";
import styles from "./styles.module.css"


const Qrcode = (props) => {
  return (
    <div className={styles.qr}>
    <QRCode
    // size={256}
    // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={props.value}
    // viewBox={`0 0 256 256`}
    />
</div>
  )
}

export default Qrcode