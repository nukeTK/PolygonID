const main = async () => {
  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const schemaHash = "aaba446f8b9ea500d96c56cabe692fe4"; // extracted from PID Platform

  const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));

  const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 2,
    value: [20020101, ...new Array(63).fill(0).map((i) => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  ERC20VerifierAddress = "0x9Fbe545B16EbBaF1Af36382bF3e53Ff7D709257a";

  let erc20Verifier = await hre.ethers.getContractAt(
    "ERC20Verifier",
    ERC20VerifierAddress
  );

  try {
    const tx = await erc20Verifier.setZKPRequest(1, validatorAddress, query);
    tx.wait();

    console.log(
      `Request set at:\nNOTE: May take a little bit to show up\nhttps://mumbai.polygonscan.com/tx/${tx.hash}`
    );
  } catch (e) {
    console.log("error: ", e);
  }
};

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function fromLittleEndian(bytes) {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
