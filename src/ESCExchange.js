const ESCExchange = {
	abi: JSON.parse('[ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addressMapping", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "param1", "type": "address" }, { "name": "param2", "type": "address" }, { "name": "param3", "type": "uint256" }, { "name": "param4", "type": "uint256" } ], "name": "reserve3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_implementation", "type": "address" } ], "name": "upgrade", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "seenNonces", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "txid", "type": "uint256" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "_nonce", "type": "uint256[]" }, { "name": "v", "type": "uint8[]" }, { "name": "r", "type": "bytes32[]" }, { "name": "s", "type": "bytes32[]" } ], "name": "withdrawEth", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "reserve_address_uint256", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "setFeeRate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "oracles", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "totalFee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "reserve_address_address", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "reserve_uint256_bool", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_ORACLES_PARTYES", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "token_address", "type": "address" }, { "name": "txid", "type": "uint256" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "_nonce", "type": "uint256[]" }, { "name": "v", "type": "uint8[]" }, { "name": "r", "type": "bytes32[]" }, { "name": "s", "type": "bytes32[]" } ], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "transactions", "outputs": [ { "name": "destination", "type": "address" }, { "name": "value", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "implementation_slot", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "ethTokenAddress", "type": "address" }, { "name": "escTokenAddress", "type": "address" } ], "name": "setTokenMapping", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "isOracle", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "seenTxids", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "transactionCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "param1", "type": "address" }, { "name": "param2", "type": "uint256" } ], "name": "reserve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_required", "type": "uint256" } ], "name": "changeRequired", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "param1", "type": "address" }, { "name": "param2", "type": "address" }, { "name": "param3", "type": "uint256" } ], "name": "reserve2", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "required", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_oracle", "type": "address" } ], "name": "addOracle", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_oracle", "type": "address" } ], "name": "removeOracle", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_oracles", "type": "address[]" }, { "name": "_required", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "to", "type": "address" }, { "indexed": true, "name": "amount", "type": "uint256" } ], "name": "Execution", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "to", "type": "address" }, { "indexed": true, "name": "amount", "type": "uint256" } ], "name": "ExecutionFailure", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "fee", "type": "uint256" } ], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "tokenAddress", "type": "address" }, { "indexed": true, "name": "account", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "MintToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "ethTokenAddress", "type": "address" }, { "indexed": true, "name": "escTokenAddress", "type": "address" } ], "name": "SetTokenMapping", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_required", "type": "uint256" } ], "name": "RequirementChange", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_oracle", "type": "address" } ], "name": "OracleRemoval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_oracle", "type": "address" } ], "name": "OracleAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "txid", "type": "uint256" } ], "name": "TxidVerified", "type": "event" } ]'),
	address: '0xb861A223A527e264B31244E2A8448Ba4D99d3E31',
	wethTokenABI: JSON.parse('[ { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" }, { "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" } ]'),
	wethTokenAddress: "0xeac3BD24AA8F3CBc3f5908c5690489Bce851C28E"
}

export default ESCExchange