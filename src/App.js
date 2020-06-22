import React, { useState } from 'react';
import God from './God'
import MainView from './MainView'

function App() {
  const [me, setMe] = useState('')
  const [net, setNet] = useState('')
  const [message, setMessage] = useState('点击"Send"按钮发送token')

  God.init(() => {
    setMe(God.theAccount)
    setNet(God.theNetwork)
  })

  const sendEth = () => {
    setMessage('正在向指定合约转帐，等待唤起Metamask……')

    God.sendEth(tx => {
      setMessage('转帐请求（' + tx + '）正在确认，请求签名接口……')

      God.requestAPI(tx, result => {
        setMessage('正在请求提币合约……')

        God.makeWithdrawer(result.contract)
        God.withdraw(result, () => {
          setMessage('流程结束，提取请求正在等待节点确认……')
        })
      })
    })
  }

  return (
    <div>
      <h1 style={{ marginLeft: '1rem' }}>Smart Contract Testing</h1>

      <MainView
        net={net}
        wallet={me}
        sendEth={sendEth}
        message={message} />
    </div>
  );
}

export default App;
