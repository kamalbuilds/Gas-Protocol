"use client";
import { AccountAbstractionContext } from "@/contexts/AccountAbstractionContext";
import { utils } from "ethers";
import Link from "next/link";
import React, { useContext, useState } from "react";
import AddressLabel from "./AddressLabel";
import { FaLongArrowAltRight } from "react-icons/fa";
import GelatoTaskStatusLabel from "./GelatoTaskStatusLabel";


const RelayKit = () => {
    const transferAmount = 0.001;
    const {
        safeBalance,
        isAuthenticated,
        gelatoTaskId,
        isRelayerLoading,
        relayTransaction,
        chain,
        chainId,
        safeSelected,
    } = useContext(AccountAbstractionContext);

    const hasNativeFunds =
        !!safeBalance &&
        Number(utils.formatEther(safeBalance || "0")) > transferAmount;

    const [transactionHash, setTransactionHash] = useState<string>('')


    return (
        <div>
            <h1>Relay Transaction</h1>

            {isRelayerLoading && <h2>Loading ...</h2>}

            {gelatoTaskId && (
                <GelatoTaskStatusLabel
                    gelatoTaskId={gelatoTaskId}
                    chainId={chainId}
                    setTransactionHash={setTransactionHash}
                    transactionHash={transactionHash}
                />
            )}

            {!isRelayerLoading && !gelatoTaskId && (
                <>
                    <h2> Check the status of your relayed transaction.</h2>

                    <button
                        style={{ cursor: !hasNativeFunds ? "not-allowed" : "pointer" }}
                        className="border-2 p-2 bg-[#1d4ed8]  border-transparent rounded-lg"
                        disabled={!hasNativeFunds}
                        onClick={relayTransaction}
                    >
                        Send Transaction
                    </button>

                    {!hasNativeFunds && (
                        <h3 className="color-red">
                            Insufficient funds. Send some funds to the Safe Account
                        </h3>
                    )}

                    {!hasNativeFunds && chain?.faucetUrl && (
                        <Link href={chain.faucetUrl} target="_blank">
                            Request 0.5 {chain.token}.
                        </Link>
                    )}
                </>
            )}

            <div>
                <h3>
                    Transfer {transferAmount} {chain?.token}
                </h3>

                {safeSelected && (
                    <div className="flex flex-row gap-5 items-center">

                        <AddressLabel address={safeSelected} />

                        <FaLongArrowAltRight />

                        <AddressLabel address={safeSelected} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelayKit;
