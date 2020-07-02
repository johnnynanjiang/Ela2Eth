import React, { useState, useEffect } from 'react';
import God from './God'
import Web3 from 'web3'
import { notification } from 'antd'
import './App.css'
import '../node_modules/antd/dist/antd.css'

let transactionHash = ''

function App() {

  const [me, setMe] = useState('')
  const [net, setNet] = useState('')
  const [balance, setBalance] = useState(0)
  const [meELA, setMeELA] = useState('')
  const [netELA, setNetELA] = useState('')
  const [balanceELA, setBalanceELA] = useState(0)
  const [balanceToken, setBalanceToken] = useState(0)
  const [useEthereum, setUseEthereum] = useState(true)
  const [ETHInput, setETHInput] = useState(0.0001)
  const [isStep2, setIsStep2] = useState(false)
  const [red, setRed] = useState(false)

  /**
   * 因为是测试模拟流程，所以没有实现基于web3的新建帐户或导入已有帐户私钥等功能，暂时先基于Metamask浏览器插件运行。
   * 初始化时连接Metamask后，使用Metamask封装的web3进行链的操作。
	 */
  const init = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.enable()

      God.theWeb3 = new Web3(Web3.givenProvider)
      God.theEth = window.ethereum

      window.ethereum.autoRefreshOnNetworkChange = false
      window.ethereum.on('networkChanged', network => {
        choiceNetwork()
      })
    }

    openNotification('初始化', '请确保 Metamask 的当前 Network 是 Rinkeby Test Network。')
    choiceNetwork()
  }

  const choiceNetwork = () => {
    God.getNetwork(useEthereum, network => {
      if (network === 'Elastos Test network') {
        setUseEthereum(false)
        setNetELA(network)

        God.getAccount(account => {
          setMeELA(account)

          God.getBalanceOfETH(eth => {
            setBalanceELA(eth)

            God.getBalanceOfToken(balance => {
              setBalanceToken(balance)

              if (transactionHash !== '') {
                openNotification('签名接口', '正在请求签名接口……')

                const tx = transactionHash
                transactionHash = ''

                God.requestAPI(tx, ETHInput, result => {
                  if (result) {
                    openNotification('签名接口', '取得签名数据。正在兑换指定Token')

                    God.withdraw(result, res => {
                      if (res) {
                        openNotification('Elastos Testnet', '兑换交易（' + res + '）正在等待节点确认……')
                      } else {
                        openNotification('Elastos Testnet', '兑换交易已确认，正在更新持有Token的余额。流程结束。')

                        God.getBalanceOfToken(newBalance => {
                          setRed(true)
                          setBalanceToken(newBalance)
                        })
                      }
                    })
                  }
                }, url => {
                  openNotification('签名接口', '请求接口失败。请联系接口开发者。')
                })
              }
            })
          })
        })
      } else {
        setUseEthereum(true)
        setNet(network)

        God.getAccount(account => {
          setMe(account)

          God.getBalanceOfETH(eth => {
            setBalance(eth)
          })
        })
      }
    })
  }

  const transfer = (num) => {
    openNotification('Rinkeby Test Network', '正在向指定合约转帐，等待唤起Metamask……')

    God.transfer(num, tx => {
      openNotification('Rinkeby Test Network', '转帐交易（' + tx + '）正在确认。确认后将会自动进入下一步，请稍候……')
      transactionHash = tx
    }, tx => {
      openNotification('Rinkeby Test Network', '交易已确认。')
      setIsStep2(true)
    })
  }

  const onChangeETHInput = event => {
    setETHInput(event.currentTarget.value)
  }

  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      onClick: () => { }
    })
  }

  const onClickTransferButton = () => {
    if (ETHInput > 0) {
      transfer(ETHInput)
    }
  }

  useEffect(init, [])

  return (
    <div style={{ marginLeft: '1rem' }}>
      <h1>ETH to ELA</h1>

      <div className="infoBlock">
        请确保您的Metamask插件中已配置了两个Network:
        <ol>
          <li>Rinkeby Test Network：这应该是由Metamask默认已配置好的。</li>
          <li>Elastos Testnet：需要您手动配置。RPC：https://rpc.elaeth.io</li>
        </ol>
      </div>

      <div className="block">
        <h2>1/3：<img height="32px" src="Ethereum.png" />Rinkeby Test Network</h2>

        <div>
          <div>
            <span className="label">当前网络</span>
            <span>{net}</span>
          </div>

          <div>
            <span className="label">当前帐户</span>
            <span>{me}</span>
          </div>

          <div>
            <span className="label">当前余额</span>
            <span>{balance}</span>
          </div>

          <div>
            <span className="label">向合约转帐ETH</span>

            <span>
              <input
                onChange={onChangeETHInput}
                placeholder="ether"
                step="0.01"
                type="number" />
            </span>

            <button
              disabled={!(ETHInput > 0)}
              onClick={onClickTransferButton}>转帐</button>
          </div>
        </div>
      </div>

      {isStep2 ? (
        <div className="block">
          <h2>2/3：切换到 Elastos Testnet</h2>
          <div>请在Metamask中将Network切换到Elastos Testnet</div>
        </div>
      ) : null}

      {!useEthereum ? (
        <div className="block">
          <h2>3/3：<img height="32px" src="ELA.png" />Elastos Testnet</h2>

          <div>
            <div>
              <span className="label">当前网络</span>
              <span>{netELA}</span>
            </div>

            <div>
              <span className="label">当前帐户</span>
              <span>{meELA}</span>
            </div>

            <div>
              <span className="label">当前余额</span>
              <span>{balanceELA}</span>
            </div>

            <div>
              <span className="label">目标Token</span>
              <span>0xeac3BD24AA8F3CBc3f5908c5690489Bce851C28E</span>
            </div>

            <div>
              <span className="label">持有Token</span>
              <span style={{ color: red ? 'red' : 'black' }}>{balanceToken}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
