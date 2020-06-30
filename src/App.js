import React, { useState, useEffect } from 'react';
import God from './God'
import MainView from './MainView'
import Web3 from 'web3'

function App() {
  const [me, setMe] = useState('')
  const [net, setNet] = useState('')
  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [useEthereum, setUseEthereum] = useState(true)


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

    setMessage('请选择Network: Rinkeby Test Network')
    choiceNetwork()
  }

  const choiceNetwork = () => {
    God.getNetwork(useEthereum, network => {
      setNet(network)

      God.getAccount(account => {
        setMe(account)

        God.getBalanceOfETH(eth => {
          setBalance(eth)
        })

        setLoaded(true)
      })
    })
  }

  const transfer = (num) => {
    setMessage('正在向指定合约转帐，等待唤起Metamask……')

    God.transfer(num, tx => {
      setMessage('转帐请求（' + tx + '）正在确认，请求签名接口……')

      God.requestAPI(tx, result => {
        // setMessage('正在请求提币合约……')
        // withdraw(result)
      }, url => {
        setMessage('请求接口失败：' + url + '\n\n请在 Metamask 中切换到 Elastos Test Network！')
        setUseEthereum(false)
      })
    })
  }

  const withdraw = data => {
    God.withdraw(data, () => {
      setMessage('流程结束，提取请求正在等待节点确认……')
    })
  }

  useEffect(init, [])

  return (
    <div style={{ marginLeft: '1rem' }}>
      <h1>Smart Contract Testing</h1>

      <MainView
        net={net}
        wallet={me}
        balance={balance}
        transfer={transfer}
        loaded={loaded}
        useEthereum={useEthereum}
        withdraw={withdraw}
        message={message} />
    </div>
  );
}

export default App;
