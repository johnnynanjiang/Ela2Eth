import React from 'react'

class MainView extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 0
		}

		this.onClickSendEth = this.onClickSendEth.bind(this)
		this.onChangeValue = this.onChangeValue.bind(this)
	}

	onClickSendEth() {
		if (this.state.value > 0) {
			return this.props.sendEth(String(this.state.value))
		}
	}

	onChangeValue(event) {
		this.setState({
			value: parseFloat(event.currentTarget.value)
		})
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
				<span>Balance: </span>
				<span>{this.props.balance} ETH</span>
			</div>

			<div style={{
				marginTop: '1rem',
				marginBottom: '1rem'
			}}>
				<span>
					<input
						onChange={this.onChangeValue}
						step="0.01"
						type="number" />
					ETH
					</span>
				<button onClick={this.onClickSendEth}>Send</button>
			</div>

			<div style={{
				fontSize: '0.8rem'
			}}>{this.props.message}</div>
		</div>
	}
}

export default MainView