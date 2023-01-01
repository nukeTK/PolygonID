import React, { useState } from "react";
import query from "./queryjson";
import { QRCodeSVG } from "qrcode.react";
import { ethers } from "ethers";
import Button from "@mui/material/Button";
import contractabi from "./contracts/ERC20Verifier.sol/ERC20Verifier.json";
import { Box, Paper, Stack, Typography } from "@mui/material";
import "./App.css";
const contractAddress = "0x9Fbe545B16EbBaF1Af36382bF3e53Ff7D709257a";

const App = () => {
  const [balance, Setbalance] = useState("");
  const getProvider = async () => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    if (_provider) {
      await _provider.send("eth_requestAccounts", []);
      const _signer = _provider.getSigner();
      const _signerAddress = await _signer.getAddress();
      const _contract = new ethers.Contract(
        contractAddress,
        contractabi.abi,
        _provider
      );
      const contractInstance = _contract.connect(_signer);
      const balUser = await contractInstance.balanceOf(_signerAddress);
      Setbalance(balUser.toString());
    }
  };

  return (
    <Box>
      <Stack gap={2} sx={{ alignItems: "center" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Scan QR Code for the Airdrop of ERC20 Token
        </Typography>
        <Paper
          sx={{
            margin: "auto",
            padding: "10px",
            height: "300px",
            width: "300px",
          }}
        >
          <QRCodeSVG className="icon" value={JSON.stringify(query)} />
        </Paper>
        <Button
          onClick={() => getProvider()}
          variant="contained"
          sx={{ width: "20%" }}
        >
          Click to See Your Airdrop
        </Button>
        <Typography variant="h6" sx={{fontWeight:"600"}}>{balance?balance:"Zero"}</Typography>
      </Stack>
    </Box>
  );
};

export default App;
