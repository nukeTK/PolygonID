// Corresponding QR Code
const query = 
{  
    "id":"709eaa58-3eb5-4475-b56f-c0a5d0970a86",
    "typ":"application/iden3comm-plain-json",
    "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    "body":{
        "transaction_data":{
            "contract_address":"0x435936CAC77DcF6C494CDCCAF0E5beBE76d998bb",  //replace it with your contract address
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
                        "VerifiedPerson":{
                            "$eq":1
                            }
                        },
                    "schema":{
                            "url":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/e79d9f55-0404-4308-b686-dee5c88e39c5.json-ld", 
                            "type":"ProofOfPersonhood" 
                            }
                        }
                    }
                }]
            }
}
export default query;