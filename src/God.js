import ESCExchange from './ESCExchange'
import ETHExchange from "./ETHExchange"
import axios from 'axios'

const God = {
	theEth: null,
	theWeb3: null,
	_theAccount: '',
	// API: 'https://dev.elapp.org/api/v1/oracle/signature',
	// API: 'http://localhost:8080/api/v1/oracle/signature',
	API: 'http://104.224.180.40:8080/api/v1/oracle/signature',
	_contractInput: null,
	_contractOutput: null,
	_contractWETH: null,
	_networkId: 0,

	onChangeNetwork: function (func) {
		func()
	},

	getNetwork: function (work, callback) {
		console.log(work)

		this.theWeb3.eth.net.getNetworkType().then(network => {
			console.log(network)

			if (network === 'rinkeby') {
				this.theWeb3.eth.net.getId().then(id => {
					console.log(id)

					if (id === 4) {
						return callback(network)
					}
				})
			} else if (network === 'private') {
				// Elastos Test network.
				this.theWeb3.eth.net.getId().then(id => {
					return callback('Elastos Test network')
				})
			}
		})
	},

	getAccount: function (callback) {
		this.theWeb3.eth.getAccounts().then(accounts => {
			this._theAccount = accounts[0]
			return callback(this._theAccount)
		})
	},

	getBalanceOfWETH: function (callback) {
		this.getWETHContract().methods.balanceOf(this._theAccount).call().then(balance => {
			return callback(balance)
		})
	},

	getBalanceOfETH: function (callback) {
		this.theWeb3.eth.getBalance(this._theAccount).then(balance => {
			return callback(this.theWeb3.utils.fromWei(balance, 'ether'))
		})
	},

	getWETHContract: function () {
		if (!this._contractWETH) {
			this._contractWETH = new this.theWeb3.eth.Contract(ESCExchange.wethTokenABI, ESCExchange.wethTokenAddress)
		}

		return this._contractWETH
	},

	getInputContract: function () {
		if (!this._contractInput) {
			this._contractInput = new this.theWeb3.eth.Contract(ETHExchange.abi, ETHExchange.address)
		}
		return this._contractInput
	},

	/**
	 * 向初始合约发送指定ETH。
	 * @param {Number} num 转帐数量
	 * @param {Function} callback 成功后回调。
	 */
	transfer: function (num, callback) {
		// this.theWeb3.eth.sendTransaction({
		// 	from: this._theAccount,
		// 	to: ETHExchange.address,
		// 	value: this.theWeb3.utils.toWei(String(num), 'ether')
		// }, (error, hash) => {
		// 	if (error) {
		// 		return console.error(error)
		// 	} else {
		// 		return callback(hash)
		// 	}
		// })
		this.theWeb3.eth.sendTransaction({
			from: this._theAccount,
			to: ETHExchange.address,
			value: this.theWeb3.utils.toWei(String(num), 'ether')
		}).on('receipt', function (receipt) {
			return callback(receipt.transactionHash)
		})
	},

	/**
	 * 请求签名接口。
	 * @param {String} tx 转帐交易tx
	 * @param {Function} callback 成功后回调
	 */
	requestAPI: function (tx, callback, errorCallback) {
		const s = this.API + '?txid=' + tx + '&chain_type=ETH'

		// fetch(s, {
		// 	method: 'GET',
		// 	mode: 'cors',
		// }).then(res => res.json()).then(responseJson => {
		// 	if (responseJson.status === 200) {
		// 		return callback({
		// 			...responseJson.result,
		// 			amount: 3,
		// 			token_address: ETHExchange.address
		// 		})
		// 	}
		// }).catch(error => {
		// 	console.error(error);
		// 	return errorCallback(s)
		// })
		axios.get(s).then(response => {
			if (response.data.status === 200) {
				return callback({
					...response.data.result,
					amount: this.theWeb3.utils.toBN(3),
					token_address: ETHExchange.address
				})
			}
		}).catch(function (error) {
			console.log(error);
		}).then(function () { })
	},

	/**
	 * 根据签名接口返回的合约地址生成提币合约对象。
	 */
	getOutputContract: function () {
		// JSON RPC ➡ Testnet: https://rpc.elaeth.io, Mainnet: https://mainrpc.elaeth.io
		if (!this._contractOutput) {
			this._contractOutput = new this.theWeb3.eth.Contract(ESCExchange.abi, ESCExchange.address)
		}

		return this._contractOutput
	},

	/**
	 * 提币操作。
	 * @param {Object} args 参数对象。
	 * @param {Function} callback 成功后回调。
	 */
	withdraw: async function (args, callback) {
		const func = this.getOutputContract().methods.mintToken(
			args.token_address,
			args.txid,
			args.to,
			args.amount,
			[args.nonce],
			[args.v],
			[args.r],
			[args.s]
		)

		func.estimateGas({ from: this._theAccount }).then(gas => {
			console.log('交易成本为：', gas)

			func.send({
				from: this._theAccount,
				gas: gas
			}).then((res) => {
				console.log(res)
			}).catch(e => {
				console.error(e)
			})
		})
	}
}

export default God