import Web3 from 'web3'
import axios from 'axios'
import Withdrawer from './Withdrawer'
import BigNumber from 'bignumber.js'
import ELA from "./ELA";

const God = {
	theEth: null,
	theWeb3: null,
	_theAccount: '',
	// API: 'http://localhost:8080/api/v1/oracle/signature',
	API: '/go/api/v1/oracle/signature',
	_contractInput: null,
	_contractOutput: null,

	/**
	 * 因为是测试模拟流程，所以没有实现基于web3的新建帐户或导入已有帐户私钥等功能，暂时先基于Metamask浏览器插件运行。
	 * 初始化时连接Metamask后，使用Metamask封装的web3进行链的操作。
	 * @param {Function} callback 成功后回调。
	 */
	init: function (callback) {
		if (typeof window.ethereum !== 'undefined') {
			this.theEth = window.ethereum
			this.theEth.enable()
			this.theWeb3 = new Web3(Web3.givenProvider)
			return callback()
		}
	},

	getNetwork: function (callback) {
		this.theWeb3.eth.net.getNetworkType().then(network => {
			return callback(network)
		})
	},

	getAccount: function (callback) {
		this.theWeb3.eth.getAccounts().then(accounts => {
			this._theAccount = accounts[0]
			return callback(this._theAccount)
		})
	},

	getBalanceOfELA: function (callback) {
		this.getInputContract().methods.balanceOf(this._theAccount).call().then(balance => {
			return callback(balance)
		})
	},

	getBalanceOfETH: function (callback) {
		this.theWeb3.eth.getBalance(this._theAccount).then(balance => {
			return callback(this.theWeb3.utils.fromWei(balance, 'ether'))
		})
	},

	getInputContract: function () {
		if (!this._contractInput) {
			this._contractInput = new this.theWeb3.eth.Contract(ELA.abi, ELA.address)
		}
		return this._contractInput
	},

	/**
	 * 向初始合约发送指定ETH，测试时为写死的50000000000000000。
	 * @param {Number} num 转帐数量
	 * @param {Function} callback 成功后回调。
	 */
	sendELA: function (num, callback) {
		this.theWeb3.eth.sendTransaction({
			from: this._theAccount,
			to: ELA.address,
			value: new BigNumber(this.theWeb3.utils.toWei(num, 'ether'))
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
	requestAPI: function (tx, callback) {
		const s = this.API + '?txid=' + tx + '&chain_type=ETH'
		console.log(s)

		axios({
			method: 'get',
			url: s
		}).then(function (response) {
			if (response.status === 200) {
				return callback(response.result)
			}
		}).catch(function (error) {
			console.error(error)
		})

		// axios.get(s).then(function (response) {
		// 	if (response.status === 200) {
		// 		return callback(response.result)
		// 	}
		// }).catch(function (error) {
		// 	console.error(error);
		// }).then(function () { });

		// 模拟请求接口后返回数据。
		// return callback({ "to": "0x17b9fdc6f4eb2e9f4fbbf8f2d356d8e3e6346e33", "amount": 100000000000000000, "nonce": 17, "v": 27, "r": "0x01a73faf0b498d84f6d4221bd405b95716c2e9bc43ab7931a43ee3498bc14fe0", "s": "0x59db4d8d4c869ffc4fb4c1e3aeb710112ff06eda83db7bb8c22e9bfd70172509", "txid": "0x156b48cdf1794ef3a60c22d88c3efe63a0d0101442a4c30614dd6379af3f01e4", "chain": "ESC", "action": "esc_mint_token", "token_address": "0x0000000000000000000000000000000000000000", "contract": "0xE32165D46197aaCc85Bf561c548259a485C085Dc" })
	},

	/**
	 * 根据签名接口返回的合约地址生成提币合约对象。
	 */
	getOutputContract: function () {
		if (!this._contractOutput) {
			this._contractOutput = new this.theWeb3.eth.Contract(Withdrawer.abi, Withdrawer.address)
		}

		console.log(this._contractOutput)
		return this._contractOutput
	},

	/**
	 * 提币操作。
	 * @param {Object} args 参数对象。
	 * @param {Function} callback 成功后回调。
	 */
	withdraw: function (args, callback) {
		console.log('提币操作。', args)

		// this.getOutputContract().methods.mintToken(
		// this.getOutputContract().methods.withdraw(
		// this.getOutputContract().methods.withdrawEth(
		this.getInputContract().methods.mint(
			// args.token_address,
			args.txid,
			args.to,
			args.amount,
			[args.nonce],
			[args.v],
			[args.r],
			[args.s]
		).send({
			from: this._theAccount
		}, function (err, res) {
			console.log(err, res)
		})
	}
}

export default God