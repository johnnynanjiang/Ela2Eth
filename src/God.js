import Web3 from 'web3'
import Axios from 'axios' // 测试中未使用。
import Withdrawer from './Withdrawer'

const God = {
	theEth: null,
	theWeb3: null,
	theWithdrawer: null,
	theAccount: '0x0',
	theNetwork: '',
	API: '/api/v1/oracle/signature',

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
			this.theWeb3.eth.net.getNetworkType().then(network => {
				this.theNetwork = network

				this.theWeb3.eth.getAccounts().then(accounts => {
					this.theAccount = accounts[0]

					return callback()
				})
			})
		}
	},

	/**
	 * 向初始合约发送指定ETH，测试时为写死的50000000000000000。
	 * @param {Function} callback 成功后回调。
	 */
	sendEth: function (callback) {
		this.theWeb3.eth.sendTransaction({
			from: this.theAccount,
			to: '0xf98D7594f3f68ed2d667bB89f5e4506193a02eC3',
			value: '50000000000000000'
		}, (error, hash) => {
			// if (error) {
			// 	return console.error(error)
			// } else {
			// 	return callback(hash)
			// }

			// 测试时，即使中断支付也可以模拟到下一步。
			return callback('模拟tx')
		})
	},

	/**
	 * 请求签名接口。
	 * @param {String} tx 转帐交易tx
	 * @param {Function} callback 成功后回调
	 */
	requestAPI: function (tx, callback) {
		// Axios.get(this.API + 'xid=' + tx + '&chain_type=ESC').then(function (response) {
		// 	if (response.status === 200) {
		// 		return callback(response.result)
		// 	}
		// }).catch(function (error) {
		// 	console.error(error);
		// }).then(function () { });

		// 模拟请求接口后返回数据。
		return callback({
			"to": "0x5b4a755b609bca3cafb48ba893973ef6fa146554",
			"amount": 10,
			"nonce": 36,
			"v": 28,
			"r": "0x2a0b4d300510e5f7126c656b92de71f81a0a3ded5aa738a55e0c7b55be2b3d90",
			"s": "0x095cd24bab00bcd157a6441a729c064b6881e0263301b1b06c7c67062968d111",
			"txid": "0xbdd419ff6dab0d45d73bc786db0e9eda34a136d1c09ce47f6ab5af6261fea3e3",
			"chain": "ETH",
			"action": "esc_withdraw",
			"token_address": "0x52e7cA56ac0391918FAAe11a91b8827cb5838Eb8",
			"contract": "0x52e7cA56ac0391918FAAe11a91b8827cb5838Eb8"
		})
	},

	/**
	 * 根据签名接口返回的合约地址生成提币合约对象。
	 * @param {String} contractAddress 提币合约地址
	 */
	makeWithdrawer: function (contractAddress) {
		if (!this.theWithdrawer) {
			this.theWithdrawer = new this.theWeb3.eth.Contract(Withdrawer.abi, contractAddress)
		}
	},

	/**
	 * 提币操作。
	 * @param {Object} args 参数对象。
	 * @param {Function} callback 成功后回调。
	 */
	withdraw: function (args, callback) {
		this.theWithdrawer.methods.withdraw(
			args.txid,
			args.to,
			args.amount,
			[args.nonce],
			[args.v],
			[args.r],
			[args.s]
		).call().then(function (res) {
			return callback()
		})
	}
}

export default God