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
import AccountAbstraction, { AccountAbstractionConfig } from '@safe-global/account-abstraction-kit-poc'
import usePolling from "@/hooks/usePolling";
import { MetaTransactionData, MetaTransactionOptions, OperationType, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import ABI from "../abi/APEABI.json";
import { GelatoRelay, SponsoredCallRequest } from "@gelatonetwork/relay-sdk";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from '@safe-global/api-kit'

type accountAbstractionContextValue = {
    ownerAddress?: string
    chainId: string
    safes: string[]
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

    const Authenticated = !!ownerAddress && !!chainId

    const [isAuthenticated, setIsAuthenticated] = useState(Authenticated);




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

            setIsAuthenticated(true);
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
        setIsAuthenticated(false);
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
                        operation: 0,
                    }
                ]

                const options: MetaTransactionOptions = {
                    isSponsored: false,
                    gasLimit: '600000',
                    gasToken: ethers.constants.AddressZero
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
            safes,
            web3Provider,
            chainId,
            ownerAddress,
            getProvider,
            loginWeb3Auth,
            logoutWeb3Auth,
            relayTransaction,
        }}>
            {children}
        </AccountAbstractionContext.Provider>
    )
}

export default AccountAbstractionProvider;