<div style="text-align:center;">
  <img src="https://github.com/kamalbuilds/Gas-Protocol/assets/95926324/58f2125f-03bc-45d6-b06c-ab85ecd80394" alt="logo1">
</div>

Problem Statement:- 

Gas transactions are a massive friction point for onboarding new users. To get someone onboarded, who is entirely new to Web3, they have to create a wallet and possess a native token just to get started with their first transaction. 
If you are a developer with a new protocol, game, or NFT project, this can be where a lot of potential users drop off; as usual, they have to buy the native token with a fiat on-ramp, and usually, that requires KYC.

## Demo Video

[![demo](https://img.youtube.com/vi/gEKxxS2sVSU/0.jpg)](https://www.youtube.com/watch?v=gEKxxS2sVSU)

## Features 

1. Users generate a safe with the help of Account Abstraction SDK provided by Safe. This holds their native assets and allows them to do all the gasless onchain transactions.
2. Protocols register on our dapp by filling up a form and generating an api key for their specific protocols with the help of 1balance and fill up a form on our Dapp.
3.Thereby encrypting their Relay api key using Lit protocol and storing it securely with the help of TableLand.
4. They can even setup different onchain conditions like having an NFT or a token or github account etc to filter their intended users.
5. The users inturn can prove all the required conditions sufficient by their different protocols using Sismo and get whitelisted to access the gasless services.
6. This is how Protocols enable Gas less transactions for their users.
7. We have live integrations with SparkDAO showing how they make SDAI interactions smooth and gasless for their users and ApeCoin DAO where they have their minting and ape staking functions gasless.
8. Protocols can also see their users onchain Data and all their relations in the online arena using the Mask's RelationService. This helps the protocols in verifying that their users are actual users and not bots.


## Protocols used and the Files where the Code is used.

| Name                | Description                                                             | Code Location                                                   |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Safe and Gelato     | By Account Abstraction we generate a Safe for our Users. EIP 712 - for signing the meta txns. EIP 2773 - Use Gelato and 1Balance for relaying transactions. | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/login/page.tsx#L29) |
|                     |                                                                         | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/SafeAccount.tsx) |
|                     |                                                                         | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/SafeAccountInfo.tsx) |
| APE Protocol        | Our Live Integration with APE Protocol makes the staking of APE coin for New users gasless ⛽   | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/protocol/page.tsx#L103) |
|                     |                                                                       | [Link](https://goerli.etherscan.io/tx/0x6f68ed6f68ec721dd15a09be71f5046c1bc2890b206781ad45b8b0583dbafd7d) |
| MakerDAO Protocol   | sDAI is an ERC-4626, yield-bearing stablecoin, and we make the deposit and withdrawal functions gasless. | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/protocol/page.tsx#L117) |
| TableLand           | For Storing the Encrypted Relay APIs of the user in a secure and easily retrievable on-chain form. | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/TableLand.tsx) |
|                     |                                                                         | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/transactions/%5Baddress%5D/page.tsx#L38) |
| Lit Protocol        | For Encrypting the relay API key using the v3 Encryption Lit SDK and mapping the protocols with their contract address, whitelisted address, and other values. Programatic Signing - | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/api/conditionalsign.ts) |
|                     |                                                                         | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/Litencrypt.tsx) |
| Mask Network        | Use of RelationService. Develop this groundbreaking solution using RelationService API, exploring use cases from cross-platform profile search to DAO tooling, and beyond. | N/A |
| Sismo Connect       | Users can generate zk proofs and submit them to get access to gasless transactions as per the different conditions set by the protocols. For example, the condition of having an NFT as a sign of being a member of that DAO. | [Code](https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/Sismo.tsx) |


Protocol Integrations in Detail

## 1.  Safe and Gelato

By Account Abstraction we generate a Safe for our Users.
EIP 712 - for signing the meta txns
EIP 2773 - Use Gelato and 1Balance for relaying transactions

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/login/page.tsx#L29

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/SafeAccount.tsx

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/SafeAccountInfo.tsx

## 2. APE Protocol

https://goerli.etherscan.io/tx/0x6f68ed6f68ec721dd15a09be71f5046c1bc2890b206781ad45b8b0583dbafd7d

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/protocol/page.tsx#L103

## 3. MakerDAO Protocol

sDAI is an ERC-4626 , yield bearing stablecoin and we make the deposit and withdrawl functions gasless.

Makerdao- https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/protocol/page.tsx#L117

## 4. TableLand - For Storing the Encrypted Relay APIs of the user in a secure and easily retrievable onchain form.

0xkamal7/Gas Protocol Dev Address- 0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132

https://tablescan.io/gaslessprotocols_80001_8204

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/TableLand.tsx

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/app/transactions/%5Baddress%5D/page.tsx#L38

## 5. Lit Protocol

For Encrypting the relay API key using the v3 Encryption Lit SDK and mapping the protocols with their contract address , whitelisted address and other values.

Programatic Signing - https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/api/conditionalsign.ts

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/Litencrypt.tsx

## 5. Mask Network 

Use of RelationService

Develop this groundbreaking solution using RelationService API, exploring use cases from cross-platform profile search to DAO tooling, and beyond.

## 6. Sismo Connect 

Users can generate zkproofs and submit it to get access to the gasless transactions as per the different conditions set-up by the protocols.

For eg - The condition of having an NFT as a sign of being a member of that DAO.

https://github.com/kamalbuilds/Gas-Protocol/blob/master/src/components/Sismo.tsx

![image](https://github.com/kamalbuilds/Gas-Protocol/assets/95926324/3da38b7a-6cdb-41f0-9018-4546d8059845)