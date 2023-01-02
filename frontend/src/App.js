import React, { useState } from "react";
import query from "./queryjson";
import { QRCodeSVG } from "qrcode.react";
import { ethers } from "ethers";
import Button from "@mui/material/Button";
import contractabi from "./contracts/ERC20Verifier.sol/ERC20Verifier.json";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import "./App.css";
const contractAddress = "0x9Fbe545B16EbBaF1Af36382bF3e53Ff7D709257a";

const App = () => {
  const [balance, Setbalance] = useState("");
  const [contract, setContract] = useState("");
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState("");
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
      setContract(_contract);
      setAddress(_signerAddress);
      setSigner(_signer);
    }
  };

  const getBalance = async () => {
    const contractInstance = contract.connect(signer);
    const balUser = await contractInstance.balanceOf(address);
    Setbalance(balUser.toString());
  };

  return (
    <Box>
      <Stack gap={2} sx={{ alignItems: "center" }}>
        <Button variant="contained" onClick={() => getProvider()}>
          {address ? address : "Connect to MetaMask wallet"}
        </Button>
        <Typography variant="body1">
          Claim Your Free Airdrop Limited Slots
        </Typography>
        <Link
          href="https://platform-test.polygonid.com/claim-link/33610226-a30d-430c-b99e-364330509dd7"
          underline="none"
          target="_blank"
        >
          Claim
        </Link>

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
        {address ? (
          <>
            <Button
              onClick={() => getBalance()}
              variant="contained"
              sx={{ width: "20%" }}
            >
              Click to See Your Airdrop
            </Button>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {balance ? balance : "Zero"}
            </Typography>
          </>
        ) : (
          "Connect Wallet"
        )}
      </Stack>
    </Box>
  );
};

export default App;
