import React from 'react'

class MainView extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 0
		}

		this.onClickSendELA = this.onClickSendELA.bind(this)
		this.onChangeValue = this.onChangeValue.bind(this)
	}

	onClickSendELA() {
		if (this.state.value > 0) {
			return this.props.sendELA(String(this.state.value))
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
				<span>ELA Balance: </span>
				<span>{this.props.balanceELA}</span>
			</div>

			<div>
				<span>ETH Balance: </span>
				<span>{this.props.balance}</span>
			</div>

			<div style={{
				marginTop: '1rem',
				marginBottom: '1rem'
			}}>
				<div>Mapping ELA to ETH</div>

				<div>
					<span>
						<input
							onChange={this.onChangeValue}
							step="0.01"
							type="number" />
					</span>
					<button
						disabled={!(this.state.value > 0)}
						onClick={this.onClickSendELA}>Send ELA</button>
				</div>
			</div>

			<div style={{
				fontSize: '0.8rem'
			}}>{this.props.message}</div>
		</div>
	}
}

export default MainView