import ESCExchange from './ESCExchange'
import BigNumber from 'bignumber.js'
import ETHExchange from "./ETHExchange";

const God = {
	theEth: null,
	theWeb3: null,
	_theAccount: '',
	API: 'https://dev.elapp.org/api/v1/oracle/signature',
	_contractInput: null,
	_contractOutput: null,
	_contractWETH: null,
	_networkId: 0,

	onChangeNetwork: function (func) {
		func()
	},

	// /**
	//  * 因为是测试模拟流程，所以没有实现基于web3的新建帐户或导入已有帐户私钥等功能，暂时先基于Metamask浏览器插件运行。
	//  * 初始化时连接Metamask后，使用Metamask封装的web3进行链的操作。
	//  */
	// init: function () {
	// 	if (typeof window.ethereum !== 'undefined') {
	// 		this.theEth = window.ethereum
	// 		this.theEth.enable()
	// 		this.theWeb3 = new Web3(Web3.givenProvider)

	// 		window.ethereum.autoRefreshOnNetworkChange = false
	// 		window.ethereum.on('networkChanged', network => {
	// 			console.log('???????????????')
	// 			return this.onChangeNetwork()
	// 		})

	// 		// return callback()
	// 	}
	// },

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
		this.theWeb3.eth.sendTransaction({
			from: this._theAccount,
			to: ETHExchange.address,
			value: this.theWeb3.utils.toWei(String(num), 'ether')
		}, (error, hash) => {
			if (error) {
				return console.error(error)
			} else {
				return callback(hash)
			}
		})
	},

	/**
	 * 请求签名接口。
	 * @param {String} tx 转帐交易tx
	 * @param {Function} callback 成功后回调
	 */
	requestAPI: function (tx, callback, errorCallback) {
		const s = this.API + '?txid=' + tx + '&chain_type=ETH'

		fetch(s, {
			method: 'GET'
		}).then(res => res.json()).then(responseJson => {
			if (responseJson.status === 200) {
				return callback(responseJson.result)
			}
		}).catch(error => {
			console.error(error);
			return errorCallback(s)
		})
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
			new BigNumber(args.amount),
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