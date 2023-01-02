## This is a Sample Project showing the implementation of Polygon ID

### Project - Age Verification Through Polygon ID via QR Code, In order to get the Airdrop of ERC20 5000 Tokens

### For Implementation of Polygon Id, You need four contracts,

<div>
<ul>
   <li> IcircuitValidator </li>
    <li> IZKPVerifier </li>
    <li> GenesisUtils.sol - 
    For converting number into hex values, bytes etc, you can replace this contract with any other contract or use library in order to 
    convert this nuumbers into bytes and other operations. </li>
    <li>ZKPVerifier</li>
</ul>
</div>
<div>

<h6>After Importing all the contracts you need to create ERC20 contract with minting logic in order to mint the tokens for the user after they gret verified</h6>

### You need two functions to implement the ZKPVerifier must include in your contract!!!!

<ul>

 function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        // execute the airdrop
    
        }
    }

</ul>
</div>
