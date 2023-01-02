// Corresponding QR Code
const query = 
{  
    "id":"2bbefd2d-dc11-4295-890d-3bdca9dd0741",
    "typ":"application/iden3comm-plain-json",
    "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
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
                        "Date":{ //query data name should be same as attributes
                            "$lt":20020101
                            }
                        },
                    "schema":{
                            "url":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/c597ac41-3fc8-4510-a079-3d2e05889127.json-ld", 
                            "type":"ERC20Verifier" //Name should same as Schema name that you put in polygonId site
                            }
                        }
                    }
                }]
            }
}
export default query;