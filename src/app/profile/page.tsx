"use client"
import AddressLabel from "@/components/AddressLabel";
import EOAInfo from "@/components/EOAInfo";
import RelayKit from "@/components/RelayKit";
import SafeAccountInfo from "@/components/SafeAccountInfo";
import { AccountAbstractionContext } from "@/contexts/AccountAbstractionContext";
import Image from "next/image";
import { useContext } from "react";


const Profile = () => {

    const { loadingWeb3Auth, userInfo, safeSelected, ownerAddress, isAuthenticated, logoutWeb3Auth } = useContext(AccountAbstractionContext)

    console.log("User Info", userInfo, safeSelected);


    return (
        <div>
            <h2>Here the user will create the Smart Contract Wallet. Only then they can access the features of the dapp otherwise they wont access</h2>


            {userInfo && isAuthenticated && (
                <>
                    <h2>User Details</h2>

                    <div className="flex flex-row">

                        <SafeAccountInfo />

                        <div className="flex flex-col gap-5 mt-10 items-center">
                            <EOAInfo />
                            <div>
                                <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]' onClick={logoutWeb3Auth}>LogOut</button>
                            </div>
                        </div>

                    </div>
                </>
            )}


            {isAuthenticated && <RelayKit />}


        </div>
    );
};

export default Profile;