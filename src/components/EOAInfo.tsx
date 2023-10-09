import { AccountAbstractionContext } from "@/contexts/AccountAbstractionContext";
import Image from "next/image";
import React, { useContext } from "react";
import AddressLabel from "./AddressLabel";

const EOAInfo = () => {
    const {
        loadingWeb3Auth,
        userInfo,
        safeSelected,
        ownerAddress,
        isAuthenticated,
        logoutWeb3Auth,
    } = useContext(AccountAbstractionContext);

    return (
        <div className="flex flex-row justify-between mx-8 px-4 gap-5">
            <div>
                <div className="flex flex-col gap-2 items-center">
                    <Image
                        src={userInfo?.profileImage}
                        width={65}
                        height={65}
                        alt="profileImage"
                        className="rounded-xl"
                    />
                </div>
            </div>

            <div>
                <div className="flex flex-row gap-2">
                    <h3>Name: </h3>
                    <h3>{userInfo?.name}</h3>
                </div>

                <div className="flex flex-row gap-2">
                    <h3>Email Id: </h3>
                    <h3>{userInfo?.email}</h3>
                </div>

                <div className="flex flex-row gap-2">
                    <h3>Login Party: </h3>
                    <h3>{userInfo?.typeOfLogin}</h3>
                </div>

                <div className="flex flex-row gap-2">
                    <h3>Owner Address </h3>
                    {ownerAddress && (
                        <AddressLabel address={ownerAddress} showBlockExplorerLink />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EOAInfo;
