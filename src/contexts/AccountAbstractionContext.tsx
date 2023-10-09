"use client"
import { createContext, useCallback, useEffect, useState } from "react";
import { Web3AuthOptions } from '@web3auth/modal';
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter, PrivateKeyProvider } from '@web3auth/openlogin-adapter'
import { Web3AuthModalPack } from '@safe-global/auth-kit';
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers, providers, utils } from "ethers";
import { Chain, initialChain } from "@/constants/chains";
import getChain from "@/constants/getChain";
import { GelatoRelayPack } from '@safe-global/relay-kit'
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import usePolling from "@/hooks/usePolling";
import { MetaTransactionData, MetaTransactionOptions, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import ABI from "../abi/APEABI.json";
import { GelatoRelay, SponsoredCallRequest } from "@gelatonetwork/relay-sdk";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from '@safe-global/api-kit'

type accountAbstractionContextValue = {
    ownerAddress?: string
    chainId: string
    // safes: string[]
    chain?: Chain
    loadingWeb3Auth: boolean
    isAuthenticated: boolean
    web3Provider?: ethers.providers.Web3Provider
    userInfo: any
    loginWeb3Auth: () => void
    logoutWeb3Auth: () => void
    getProvider: () => void
    // setChainId: (chainId: string) => void
    safeSelected?: string
    safeBalance?: string
    // setSafeSelected: React.Dispatch<React.SetStateAction<string>>
    isRelayerLoading: boolean
    relayTransaction: () => Promise<void>
    gelatoTaskId?: string
    // openStripeWidget: () => Promise<void>
    // closeStripeWidget: () => Promise<void>
    // startMoneriumFlow: () => Promise<void>
    // closeMoneriumFlow: () => void
    approveAPEStaking: () => void
}

const initialState = {
    loadingWeb3Auth: false,
    userInfo: null,
    isAuthenticated: false,
    loginWeb3Auth: () => { },
    logoutWeb3Auth: () => { },
}

export const AccountAbstractionContext = createContext<accountAbstractionContextValue>(initialState);

const AccountAbstractionProvider = ({ children }: { children: JSX.Element }) => {
    const id = 2;

    const [chainId, setChainId] = useState<string>(initialChain.id);
    const [ownerAddress, setOwnerAddress] = useState<string>('');
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider>()
    const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>()
    const [safes, setSafes] = useState<string[]>([]);

    const [userInfo, setUserInfo] = useState<any>();

    const [loadingWeb3Auth, setLoadingWeb3Auth] = useState<boolean>(false);

    const chain = getChain(chainId) || initialChain

    console.log("Owner address", ownerAddress, chainId);

    const isAuthenticated = !!ownerAddress && !!chainId


    useEffect(() => {
        (async () => {
            setLoadingWeb3Auth(true);
            const options: Web3AuthOptions = {
                clientId: 'BDB6MmpZuqwQ0fCs4jBEu0dA9_6gbXCj1CqDgWNDN-s9ByAKvCY2dEgQDdXGi8XlfU-VBzKuMwME_5fp-2WFwJ0',
                // clientId: 'DyZp_HnJ5pV5s3iCNCxiycSL1M8cM_Av7WzdYIUiobM_',

                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: chain.id,
                    rpcTarget: chain.rpcUrl,
                    displayName: chain.label,
                    blockExplorer: chain?.blockExplorerUrl,
                    ticker: chain.token,
                    tickerName: chain.label,
                },
                web3AuthNetwork: 'testnet',
                uiConfig: {
                    modalZIndex: '99998',
                    loginMethodsOrder: ['google', 'facebook']
                }
            }

            const modalConfig = {
                [WALLET_ADAPTERS.TORUS_EVM]: {
                    label: 'torus',
                    showOnModal: false
                },
                [WALLET_ADAPTERS.METAMASK]: {
                    label: 'metamask',
                    showOnDesktop: true,
                    showOnMobile: false
                }
            }

            const web3AuthModalPack = new Web3AuthModalPack({
                txServiceUrl: 'https://safe-transaction-goerli.safe.global'
            })

            await web3AuthModalPack.init({
                options,
                modalConfig
            })

            setLoadingWeb3Auth(false);
            setWeb3AuthModalPack(web3AuthModalPack)
        })()
    }, [chain])


    const loginWeb3Auth = useCallback(async () => {
        if (!web3AuthModalPack) return

        try {
            const { safes, eoa } = await web3AuthModalPack.signIn()
            const provider = web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider

            console.log("Safes", safes, eoa, provider);

            const userInfo = await web3AuthModalPack.getUserInfo()
            console.log("User info: ", userInfo, web3AuthModalPack, new ethers.providers.Web3Provider(provider));

            setUserInfo(userInfo);
            setChainId(chain.id)
            setOwnerAddress(eoa)
            setSafes(safes || [])
            setWeb3Provider(new ethers.providers.Web3Provider(provider))
        } catch (error) {
            console.log('error: ', error)
        }


    }, [chain, web3AuthModalPack])

    useEffect(() => {
        if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
            ; (async () => {
                await loginWeb3Auth()
            })()
        }
    }, [web3AuthModalPack, loginWeb3Auth])


    const logoutWeb3Auth = () => {
        web3AuthModalPack?.signOut()
        setOwnerAddress('')
        setSafes([])
        setChainId(chain.id)
        setWeb3Provider(undefined)
        setSafeSelected('')
        // setGelatoTaskId(undefined)
    }

    const [safeSelected, setSafeSelected] = useState<string>('')

    const fetchSafeBalance = useCallback(async () => {
        const balance = await web3Provider?.getBalance(safeSelected)

        return balance?.toString()
    }, [web3Provider, safeSelected])

    const safeBalance = usePolling(fetchSafeBalance)

    const getProvider = useCallback(async () => {
        console.log("Provider", web3Provider, safes);
        if (!web3Provider) {
            await loginWeb3Auth();
        }
        return web3Provider;
    }, [loginWeb3Auth, web3Provider])


    // conterfactual safe Address if its not deployed yet
    useEffect(() => {
        const getSafeAddress = async () => {
            if (web3Provider) {
                try {
                    const signer = web3Provider.getSigner()
                    const relayPack = new GelatoRelayPack()
                    const safeAccountAbstraction = new AccountAbstraction(signer)

                    await safeAccountAbstraction.init({ relayPack })

                    const hasSafes = safes.length > 0

                    const safeSelected = hasSafes ? safes[0] : await safeAccountAbstraction.getSafeAddress()

                    console.log('Safe selected in the context >>>>', safeSelected);

                    setSafeSelected(safeSelected)
                } catch (error) {
                    console.log("Error in the useEffect", error);
                }

            }
        }

        getSafeAddress()
    }, [safes, web3Provider])

    const [isRelayerLoading, setIsRelayerLoading] = useState<boolean>(false)
    const [gelatoTaskId, setGelatoTaskId] = useState<string>()

    useEffect(() => {
        setIsRelayerLoading(false)
        setGelatoTaskId(undefined)
    }, [chainId])

    const relayTransaction = async () => {
        if (web3Provider) {
            setIsRelayerLoading(true)

            try {
                const signer = web3Provider.getSigner()
                const relayPack = new GelatoRelayPack()
                const safeAccountAbstraction = new AccountAbstraction(signer)

                await safeAccountAbstraction.init({ relayPack })

                // we use a dump safe transfer as a demo transaction
                const dumpSafeTransafer: MetaTransactionData[] = [
                    {
                        to: safeSelected,
                        data: '0x',
                        value: utils.parseUnits('0.001', 'ether').toString(),
                        operation: 0 // OperationType.Call,
                    }
                ]

                const options: MetaTransactionOptions = {
                    isSponsored: false,
                    gasLimit: '600000', // in this alfa version we need to manually set the gas limit
                    gasToken: ethers.constants.AddressZero // native token
                }

                const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)

                console.log("Gelato Task Id", gelatoTaskId);

                setIsRelayerLoading(false)
                setGelatoTaskId(gelatoTaskId)
            } catch (error) {
                console.log("Error", error);
            }


        }
    }

    const approveAPEStaking = async () => {
        if (web3Provider) {

            try {
                const apiKey = 'DyZp_HnJ5pV5s3iCNCxiycSL1M8cM_Av7WzdYIUiobM_';
                const signer = web3Provider.getSigner()
                // const relayPack = new GelatoRelayPack();
                const relay = new GelatoRelay();
                // const safeAccountAbstraction = new AccountAbstraction(signer)

                // await safeAccountAbstraction.init({ relayPack });

                const apeStakingContractAddress = '0xeF37717B1807a253c6D140Aca0141404D23c26D4';
                const apeCoin = '0x328507DC29C95c170B56a1b3A758eB7a9E73455c';

                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer || web3Provider
                })

                // const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
                // const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapter })

                const safeAddress = '0x6EA0a469b499Bc9d5938100dF7056b5F129c8787';
                const owner = '0x2e895Ed10fd30EB52502Bb5358DAe4F0309ce9EC';

                const safeSDK = await Safe.create({
                    ethAdapter,
                    safeAddress
                })

                const contract = new ethers.Contract(
                    apeCoin,
                    ABI,
                    web3Provider,
                )

                const amount = ethers.utils.parseUnits('0.001', 'ether').toString()

                const mintAmount = utils.parseUnits('1', 'ether').toString();
                console.log("Mint AMount", mintAmount, contract);


                const minTx = await contract.populateTransaction.mint(ownerAddress, mintAmount);
                console.log("Transaction data ", minTx.data, minTx);

                const safeTransactionData: SafeTransactionDataPartial = {
                    to: apeCoin,
                    value: amount,
                    data: minTx.data as string,
                    gasPrice: '21000'

                }

                console.log("Safe transaction data>>>", safeTransactionData);

                const safeTransaction = await safeSDK.createTransaction({ safeTransactionData })

                console.log("Safe transaction>>>", safeTransaction);

                const safeTxHash = await safeSDK.getTransactionHash(safeTransaction)

                // console.log("Safe transaction hash>>>", safeTxHash);

                const senderSignature = await safeSDK.signTransactionHash(safeTxHash)

                console.log("Safe transaction signature >>>", senderSignature);

                // const _safeTransactions = await safeService.getTransaction(safeTxHash)

                // console.log("Checked Data >>>", _safeTransactions);

                const executeTxResponse = await safeSDK.executeTransaction(safeTransaction)

                console.log("executeTxResponse >>>", executeTxResponse);

                const receipt = await executeTxResponse.transactionResponse?.wait()

                console.log('Transaction executed:')
                console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)



                // const relayPack = new GelatoRelayPack(apiKey)
                // const safeAccountAbstraction = new AccountAbstraction(signer)

                // await safeAccountAbstraction.init({ relayPack })

                // // we use a dump safe transfer as a demo transaction
                // const dumpSafeTransafer: MetaTransactionData[] = [
                //     {
                //         to: apeCoin,
                //         data: minTx,
                //         value: mintAmount
                //     }
                // ]

                // const options: MetaTransactionOptions = {
                //     isSponsored: false,
                //     gasLimit: '600000', // in this alfa version we need to manually set the gas limit
                //     gasToken: ethers.constants.AddressZero // native token
                // }


                // const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)

                // console.log("Gelato Task Id", gelatoTaskId);






                // await signer.sendTransaction(safeTransaction)
                // await signer.signTransaction(safeTransaction)

                // const apecoininstance = new ethers.Contract(apeCoin, ABI, web3Provider);
                // const amount = utils.parseUnits('1', 'ether').toString();
                // const populatedTransferTxn = await apecoininstance.populateTransaction.approve(
                //     apeStakingContractAddress,
                //     amount
                // );
                // const calldata = populatedTransferTxn.data;
                // console.log("CallData", calldata);

                // const request: SponsoredCallRequest = {
                //     chainId: (await web3Provider.getNetwork()).chainId,
                //     target: apeCoin,
                //     data: calldata,
                // };

                // const relayResponse = await relay.sponsoredCall(request, apiKey);
                // setGelatoTaskId(relayResponse)
                // console.log("relay response", relayResponse)

                // // we use a dump safe transfer as a demo transaction
                // const dumpSafeTransafer: MetaTransactionData[] = [
                //     {
                //         to: apeStakingContractAddress,
                //         data: calldata,
                //         value: utils.parseUnits('1', 'ether').toString(),
                //         operation: 0 // OperationType.Call,
                //     }
                // ]

                // const options: MetaTransactionOptions = {
                //     isSponsored: true,
                //     gasLimit: '600000', // in this alfa version we need to manually set the gas limit
                //     gasToken: ethers.constants.AddressZero // native token
                // }

                // // const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)
                // const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)
                // setGelatoTaskId(gelatoTaskId)





                // setIsRelayerLoading(false)
                // setGelatoTaskId(gelatoTaskId)
            } catch (error) {
                console.log("Error", error);
            }

        }
    }




    return (
        <AccountAbstractionContext.Provider value={{
            loadingWeb3Auth,
            userInfo,
            isAuthenticated,
            safeBalance,
            isRelayerLoading,
            gelatoTaskId,
            chain,
            safeSelected,
            web3Provider,
            chainId,
            ownerAddress,
            getProvider,
            loginWeb3Auth,
            logoutWeb3Auth,
            relayTransaction,
            approveAPEStaking
        }}>
            {children}
        </AccountAbstractionContext.Provider>
    )
}

export default AccountAbstractionProvider;