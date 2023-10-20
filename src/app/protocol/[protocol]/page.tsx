"use client";
import { useState } from 'react';
import {
  Button,
  ChakraProvider,
  Container,
  Input,
  VStack,
} from '@chakra-ui/react';
import * as LitJsSdk from '@lit-protocol/lit-node-client';

function App() {
  const [str, setStr] = useState('This test is working! Omg!');
  const [encryptedStr, setEncryptedStr] = useState('');
  const [decryptedStr, setDecryptedStr] = useState('');

  const encrypt = async () => {
    try {
      const litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: 'cayenne',
      });
      await litNodeClient.connect();

      const authRes = await LitJsSdk.checkAndSignAuthMessage({
        chain: 'ethereum',
      });

      const accss = [
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

      const accs = [
        {
          contractAddress: '',
          standardContractType: '',
          chain: 'ethereum',
          method: '',
          parameters: [
            ':userAddress',
          ],
          returnValueTest: {
            comparator: '=',
            value: '0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132'
          }
        }
      ]

      const encryptRes = await LitJsSdk.encryptString({
        accessControlConditions: accs,
        authSig: authRes,
        chain: 'ethereum',
        dataToEncrypt: str,
      }, litNodeClient);
      console.log('encryptRes', encryptRes);

      setEncryptedStr(encryptRes.ciphertext);
    } catch (error) {
      console.error('Encryption error:', error);
    }
  };

  const decrypt = async () => {
    try {
      const litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: 'cayenne',
      });
      await litNodeClient.connect();

      const authRes = await LitJsSdk.checkAndSignAuthMessage({
        chain: 'ethereum',
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

      // You should replace 'encryptedStr' with the actual ciphertext.
      const decryptRes = await LitJsSdk.decryptToString({
        accessControlConditions: accs,
        ciphertext: encryptedStr, // Replace with actual ciphertext
        dataToEncryptHash: '', // Replace with the hash
        authSig: authRes,
        chain: 'ethereum',
      }, litNodeClient);
      console.log('decryptRes', decryptRes);
      
      setDecryptedStr(decryptRes);
    } catch (error) {
      console.error('Decryption error:', error);
    }
  };

  return (
    <Container maxW="lg" p={4}>
      <VStack spacing={4}>
        <h4>Encrypt and Decrypt Your String:</h4>
        <Input
          type="text"
          value={str}
          onChange={(e) => {
            setStr(e.target.value);
          }}
        />
        <Button colorScheme="blue" onClick={encrypt}>
          Encrypt String
        </Button>
        <Button colorScheme="green" onClick={decrypt}>
          Decrypt String
        </Button>
        {encryptedStr && <p>Encrypted String: {encryptedStr}</p>}
        {decryptedStr && <p>Decrypted String: {decryptedStr}</p>}
      </VStack>
    </Container>
  );
}

export default App;