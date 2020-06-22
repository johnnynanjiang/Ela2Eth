import React from 'react'

class MainView extends React.Component {
	constructor(props) {
		super(props)

		this.onClickSendEth = this.onClickSendEth.bind(this)
	}

	onClickSendEth() {
		return this.props.sendEth()
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

			<div style={{
				marginTop: '1rem',
				marginBottom: '1rem'
			}}>
				<button onClick={this.onClickSendEth}>Send</button>
			</div>

			<div style={{
				fontSize: '0.8rem'
			}}>{this.props.message}</div>
		</div>
	}
}

export default MainView