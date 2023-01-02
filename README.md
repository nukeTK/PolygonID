## This is a Sample Project showing the implementation of Polygon ID

### Project - Age Verification Through Polygon ID via QR Code, In order to get the Airdrop of ERC20 5000 Tokens

### For Implementation of Polygon Id, You need four contracts,

<div>
<ul>
   <li> IcircuitValidator </li>
    <li> IZKPVerifier </li>
    <li> GenesisUtils.sol - 
    For converting number into hex values, bytes etc, you can replace this contract with any other contract or use library in order to 
    convert numbers into bytes or any other operations. </li>
    <li>ZKPVerifier</li>
</ul>
</div>
<div>

<h6>After Importing all the contracts you need to create ERC20 contract with minting logic in order to mint the tokens for the user after they gret verified</h6>

### You need two functions to implement the PolygonID!!!!

</div>

```
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
```

```
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

```

## After this you need to deploy, the Contract and set a request to setZkRequest function, which sets the request !!!!

### Important

In set-request script you need mentioned below query,

```
const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 2,
    value: [20020101, ...new Array(63).fill(0).map((i) => 0)],
    circuitId,
  };
```

all the details about the argument explain in below link

https://0xpolygonid.github.io/tutorials/verifier/on-chain-verification/overview/#deploy-the-contract

After this you need create js or ts query file, which includes query that can create QR code SVG,

###Important

## Case sensative Point

```
const query = 
{  
    "id":"2bbefd2d-dc11-4295-890d-3bdca9dd0741",
    //Code
    "body":{
        "transaction_data":{
            "contract_address":"0x9Fbe545B16EbBaF1Af36382bF3e53Ff7D709257a",  //replace it with your contract address
            "method_id":"b68967e2",
            "chain_id":80001,
            "network":"polygon-mumbai"
            },
        "reason":"airdrop participation",
        "scope":[{
            "id":1,
            "circuit_id":"credentialAtomicQuerySig",
            "rules":{
                "query":{
                    "allowed_issuers":["*"],
                    "req":{ 
                        "Date":{ //query data name should be same as attributes // 
                            "$lt":20020101
                            }
                        },
                    "schema":{
                            //Schema URL Address
                            "url":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/c597ac41-3fc8-4510-a079-3d2e05889127.json-ld",  
                            "type":"ERC20Verifier" //Name should same as Schema name that you put in polygonId 
                            }
                        }
                    }
                }]
            }
}
export default query;
```

# Thank you!!!!!