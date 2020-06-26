import React, { useState } from 'react';
import God from './God'
import MainView from './MainView'

function App() {
  const [me, setMe] = useState('')
  const [net, setNet] = useState('')
  const [balance, setBalance] = useState(0)
  const [balanceELA, setBalanceELA] = useState(0)
  const [message, setMessage] = useState('点击“转换”按钮发送token')
  const [loaded, setLoaded] = useState(false)

  God.init(() => {
    God.getNetwork(network => {
      setNet(network)
    })

    God.getAccount(account => {
      setMe(account)

      God.getBalanceOfETH(eth => {
        setBalance(eth)
      })

      setLoaded(true)
    })
  })

  const transfer = (num) => {
    setMessage('正在向指定合约转帐，等待唤起Metamask……')

    God.transfer(num, tx => {
      setMessage('转帐请求（' + tx + '）正在确认，请求签名接口……')

      God.requestAPI(tx, result => {
        setMessage('正在请求提币合约……')

        God.withdraw(result, () => {
          setMessage('流程结束，提取请求正在等待节点确认……')
        })
      })
    })
  }

  return (
    <div>
      <h1 style={{ marginLeft: '1rem' }}>Smart Contract Testing</h1>

      {loaded ? (<MainView
        net={net}
        wallet={me}
        balance={balance}
        // balanceELA={balanceELA}
        transfer={transfer}
        message={message} />) : null}
    </div>
  );
}

export default App;
