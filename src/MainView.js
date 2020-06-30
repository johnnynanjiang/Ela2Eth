import React from 'react'

class MainView extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 0,
			dataString: ''
		}

		this.onClickTransferButton = this.onClickTransferButton.bind(this)
		this.onChangeValue = this.onChangeValue.bind(this)
		this.onChangeDataString = this.onChangeDataString.bind(this)
		this.onClickSubmit = this.onClickSubmit.bind(this)
	}

	onClickTransferButton() {
		if (this.state.value > 0) {
			return this.props.transfer(this.state.value)
		}
	}

	onChangeValue(event) {
		this.setState({
			value: parseFloat(event.currentTarget.value)
		})
	}

	onChangeDataString(event) {
		this.setState({
			dataString: event.currentTarget.value
		})
	}

	onClickSubmit(event) {
		this.props.withdraw(JSON.parse(this.state.dataString).result)
	}

	render() {
		return <div style={{
			margin: '1rem',
			fontFamily: 'monospace'
		}}>
			<div>
				<span>Current Network: </span>
				<span>{this.props.net}</span>
			</div>

			<div>
				<span>Current Wallet: </span>
				<span>{this.props.wallet}</span>
			</div>

			<div>
				<span>ETH Balance: </span>
				<span>{this.props.balance}</span>
			</div>

			{this.props.loaded ? (
				<div style={{
					marginTop: '1rem',
					marginBottom: '1rem'
				}}>
					<div>Transfer ETH to WETH</div>

					<div>
						<span>
							<input
								onChange={this.onChangeValue}
								placeholder="ether"
								step="0.01"
								type="number" />
						</span>
						<button
							disabled={!(this.state.value > 0)}
							onClick={this.onClickTransferButton}>转换</button>
					</div>
				</div>
			) : null}

			<div style={{
				fontSize: '0.8rem'
			}}>{this.props.message}</div>

			{!this.props.useEthereum ? (
				<div>
					<textarea
						onChange={this.onChangeDataString}
						placeholder="粘贴前述接口返回的Json字符串" />
					<button onClick={this.onClickSubmit}>提取</button>
				</div>
			) : null}
		</div>
	}
}

export default MainView