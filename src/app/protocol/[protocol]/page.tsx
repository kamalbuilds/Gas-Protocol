"use client"
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { useState } from 'react';

function App() {

  interface BenchmarkedResult<T> {
    duration: string;
    result: T;
  }

async function benchmark<T>(fn: () => Promise<T>): Promise<BenchmarkedResult<T>> {
    const t0 = performance.now();
    const result = await fn();
    const t1 = performance.now();

    return {
        duration: (t1 - t0) + " ms",
        result
    };
}

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
    <>
    <div className="App">
        <h4>
          Encrypt your API Key :<br />
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
    </div>
    </>
  );
}

export default App;