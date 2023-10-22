export type Chain = {
    id: string
    token: string
    rpcUrl: string
    shortName: string
    label: string
    color?: string
    icon?: string
    blockExplorerUrl: string
    transactionServiceUrl?: string
    isStripePaymentsEnabled: boolean // only available in Mumbai chain
    faucetUrl?: string
}

export const gnosisChain: Chain = {
    id: '0x64',
    token: 'xDai',
    shortName: 'gno',
    label: 'Gnosis Chain',
    rpcUrl: 'https://rpc.gnosischain.com',
    blockExplorerUrl: 'https://gnosisscan.io',
    color: '#3e6957',
    transactionServiceUrl: 'https://safe-transaction-gnosis-chain.safe.global',
    isStripePaymentsEnabled: false
}

export const goerliChain: Chain = {
    id: '0x5',
    token: 'gETH',
    label: 'Görli',
    shortName: 'gor',
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    color: '#fbc02d',
    transactionServiceUrl: 'https://safe-transaction-goerli.safe.global',
    isStripePaymentsEnabled: false,
    faucetUrl: 'https://goerlifaucet.com/'
}

export const mainnetChain: Chain = {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum',
    shortName: 'eth',
    rpcUrl: 'https://cloudflare-eth.com',
    blockExplorerUrl: 'https://etherscan.io',
    color: '#DDDDDD',
    transactionServiceUrl: 'https://safe-transaction-mainnet.safe.global',
    isStripePaymentsEnabled: false
}

export const polygonChain: Chain = {
    id: '0x89',
    token: 'matic',
    shortName: 'matic',
    label: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    color: '#8248E5',
    transactionServiceUrl: 'https://safe-transaction-polygon.safe.global',
    isStripePaymentsEnabled: false
}

export const mumbaiChain: Chain = {
    id: '0x13881',
    token: 'matic',
    shortName: 'matic',
    label: 'Mumbai',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/qE2DQAceN-5PaCcnXaqlQ2WxrAtkiXHM',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    color: '#8248E5',
    isStripePaymentsEnabled: true,
    faucetUrl: 'https://mumbaifaucet.com/'
}

export const basegorelliChain: Chain = {
    id: '0x14a33',
    token: 'ETHEREUM',
    label: 'Base Gorelli',
    shortName: 'ETH',
    rpcUrl: 'https://responsive-stylish-snowflake.base-goerli.discover.quiknode.pro/0c108f72ab3dabce11f1f359c4a7c9a6b35fcedc/',
    blockExplorerUrl: 'https://goerli.basescan.org/',
    color: '#fbc02d',
    transactionServiceUrl: 'https://safe-transaction-base-testnet.safe.global/',
    isStripePaymentsEnabled: false
}

export const opgorelliChain: Chain = {
    id: '0x1a4',
    token: 'OP',
    label: 'OP Gorelli',
    shortName: 'OP',
    rpcUrl: 'https://opt-goerli.g.alchemy.com/v2/e1-xZUsVn8cFs1deExUpYSLjiFHhRU54',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io/',
    color: '#fbc02d',
    // transactionServiceUrl: 'https://safe-transaction-op-testnet.safe.global/',
    isStripePaymentsEnabled: false
}


const chains: Chain[] = [gnosisChain, goerliChain, mainnetChain, mumbaiChain, polygonChain, basegorelliChain, opgorelliChain]

export const initialChain = goerliChain

export default chains
