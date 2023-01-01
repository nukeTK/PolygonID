import React from 'react'
import query from "./queryjson";
import {QRCodeSVG} from 'qrcode.react';
import './App.css';
const contractAddress = "0x435936CAC77DcF6C494CDCCAF0E5beBE76d998bb";

const App = () => {

  //query.body.scope[0].rules.query.req.VerifiedPerson.$eq 
  return (
    <div>
      <QRCodeSVG  value={JSON.stringify(query)}/>
    </div>
  )
}

export default App