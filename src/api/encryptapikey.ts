import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { useState } from 'react';
import './App.css';
import { benchmark } from './utils';

function App() {

  // ----- autogen:app-name:start  -----
  const [appName, setAppName] = useState('Simple Encrypt Decrypt');
  // ----- autogen:app-name:end  -----

  const [npmRepo, setNpmRepo] = useState('https://github.com/LIT-Protocol/js-sdk/tree/master/packages/lit-node-client');
  const [demoRepo, setDemoRepo] = useState('https://github.com/LIT-Protocol/js-sdk/tree/master/apps/demo-encrypt-decrypt-react');
  const [lang, setLang] = useState('json');
  const [data, setData] = useState<object | string>({
    data: {
      name: 'Lit Protocol',
      description: 'Threadshold cryptography for the win!',
    }
  });
  const [str, setStr] = useState('This test is working! Omg!');

  const go = async () => {

    const litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: 'cayenne',
    });
    await litNodeClient.connect();


    // --------- NEXT STEP ---------
    const authRes = await benchmark(async () => {
      return LitJsSdk.checkAndSignAuthMessage({
        chain: 'ethereum'
      });
    });

    const accs = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0',
        },
      },
    ];

    console.log("NETWORK PUB KEY:", litNodeClient.networkPubKey);


    // --------- NEXT STEP ---------
    const encryptRes = await benchmark(async () => {
      return LitJsSdk.encryptString({
        accessControlConditions: accs,
        authSig: authRes.result,
        chain: 'ethereum',
        dataToEncrypt: str,
      }, litNodeClient);
    });


    // --------- NEXT STEP ---------
    const decryptRes = await benchmark(async () => {
      return LitJsSdk.decryptToString({
        accessControlConditions: accs,
        ciphertext: encryptRes.result.ciphertext,
        dataToEncryptHash: encryptRes.result.dataToEncryptHash,
        authSig: authRes.result,
        chain: 'ethereum',
      }, litNodeClient);
    })

  }

  return (
    <div className="App">
        <h4>
          React Demo for: {appName}<br />
          <span>
            <a target="_blank" href={npmRepo}>@lit-protocol/lit-node-client repo</a>&nbsp;|&nbsp;
            <a target="_blank" href={demoRepo}>demo repo</a>
          </span>
        </h4>
        <table>
          <tr>
            <td>
              <label>String</label>
            </td>

          </tr>
          <tr>
            <td>
              <input type="text" value={str} onChange={(newStr) => {
                setStr(newStr.target.value);
              }} />
            </td>

          </tr>
        </table>

        <button onClick={go}>Encrypt & Decrypt String!</button>
      </header>

      <div className='editor'>
        <Editor
          theme="vs-dark"
          height="100vh"
          language={lang}
          value={lang === 'json' ? JSON.stringify(data, null, 2) : `${data}`}
          options={{
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
